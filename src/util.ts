declare const moment: any;

import { setSlaData, SlaDataMap, SlaConfiguration, getCardActions, CardAction, CardActionType, SlaCondition, BoardAction } from './trello-util';

type CardBadge = {
  text: string;
  color: string;
  refresh: number;
  icon?: string;
  title?: string;
};

type CardDetailedBadge = {
  title: string;
  color: string;
  text: string;
  callback?: () => {};
};

export const truncate = (str: string, n: number, shouldEllipse: boolean): string =>
    (str.length > n) ? str.substr(0, n-1) + `${shouldEllipse ? '&hellip;' : ''}` : str;

export const getHumanReadableTime = (realMinutes: number): string => {
    const isNegative = realMinutes < 0;
    const minutes = isNegative ? realMinutes * -1 : realMinutes;
    const negativeSign = isNegative ? '-' : '';

    const MINUTES = 'min';
    const HOURS = 'h';
    const DAYS = 'd';

    if (minutes < 60) {
        return `${negativeSign}${minutes}${MINUTES}`;
    } if (minutes < 1440) {
        const hours = Math.floor(minutes / 60);
        const hoursString = hours > 0 ? `${hours}${HOURS}` : '';
        const remainingMinutes = minutes - 60 * hours;
        const minutesString = remainingMinutes > 0 ? `${remainingMinutes}${MINUTES}` : '';
        const spacer = hoursString && minutesString ? ' ' : '';
        return `${negativeSign}${hoursString}${spacer}${minutesString}`;
    } 
    const days = Math.floor(minutes / 1440);
    const daysString = days > 0 ? `${days}${DAYS}` : '';
    const remainingMinutes = minutes - days * 1440;
    const remainingHours = Math.floor(remainingMinutes / 60); 
    const hoursString = remainingHours > 0 ? `${remainingHours}${HOURS}` : '';
    const spacer = daysString && hoursString ? ' ' : '';
    return `${negativeSign}${daysString}${spacer}${hoursString}`;
};

export const getMinutesRemaining = (startTime: number, maybeEndTime: number | void, config: SlaConfiguration): number => {
    const endTime = maybeEndTime ? maybeEndTime : moment().valueOf();
    const minutesElapsed = Math.floor((endTime - startTime) / 1000 / 60);
    const minutesRemaining = config.time - minutesElapsed;
    return minutesRemaining;
};

export const getColor = (minutesRemaining: number, isComplete: boolean): string => {
    if (isComplete) {
        return 'grey';
    };

    if (minutesRemaining < 0) {
        return 'red';
    } else if (minutesRemaining < 60) {
        return 'yellow';
    }
    return 'green';
};

type DynamicBadge = {
  dynamic: () => CardBadge;
};

export const getRunningSlas = (data: SlaDataMap, configs: SlaConfiguration[], detailed: boolean): CardBadge[] | CardDetailedBadge[] | DynamicBadge[] => {
    const runningSlas = [];
    const completeSlas = [];
  
    configs.forEach((config) => {
        if (data[config.id]) {
            const { startTime, endTime } = data[config.id];
            if (startTime && !endTime) {
                runningSlas.push({
                    dynamic: function() {
                        const minutesRemaining = getMinutesRemaining(startTime, endTime, config);
                        const humanReadable = getHumanReadableTime(minutesRemaining);
                        return {
                            text: humanReadable,
                            color: getColor(minutesRemaining, false),
                            ...(detailed ? { title: `${config.name} - Ongoing` } : {}),
                            ...(!detailed ? {icon: `${window.location}img/stopwatch.svg`} : {}),
                            refresh: 60,
                        };
                    }
                });
            }

            if (startTime && endTime && detailed) {
                const minutesRemaining = getMinutesRemaining(startTime, endTime, config);
                const humanReadable = getHumanReadableTime(minutesRemaining);
                completeSlas.push({
                    text: humanReadable,
                    color: getColor(minutesRemaining, true),
                    title: `${config.name} - stopped`,
                });
            }

        }
    });

    // We want the complete SLAs to come after the running ones
    const allSlas = runningSlas.concat(completeSlas);
    
    return allSlas;
};



export const getEndTime = (actions: CardAction[], endCondition: SlaCondition, startTime: number): number | void => {
    let endTime: number | void = undefined;
    actions.forEach((action) => {
        if (action.type === CardActionType.updateCard) {
            if (action.data.listAfter.id === endCondition.id &&
        (!endTime || moment(action.date).valueOf() < endTime)  && 
        moment(action.date).valueOf() > startTime) {
                endTime = moment(action.date).valueOf();
            }
        }
    });

    return endTime;
};

export const getStartTime = (actions: CardAction[], startCondition: SlaCondition): number | void => {
    let startTime: number | void = undefined;

    actions.forEach((action) => {
        if ((action.type === CardActionType.createCard || action.type === CardActionType.copyCard || action.type === CardActionType.emailCard)
         && action.data.list.id === startCondition.id) {
            startTime = moment(action.date).valueOf();
        } else if (action.type === CardActionType.updateCard &&
      action.data.listAfter.id === startCondition.id &&
      !startTime || (moment(action.date).valueOf() < startTime)) {
            startTime = moment(action.date).valueOf();
        }
    });

    return startTime;
};

export const getUpdatedSlaData = (actions: CardAction[], configs: SlaConfiguration[], slaMap: SlaDataMap): SlaDataMap | void => {
    const updatedSlaMap = slaMap;
    let hasChanged = false;

    configs.forEach(config => {
        const { id, startCondition, endCondition } = config;

        if (!updatedSlaMap[id]) {
            updatedSlaMap[id] = {};
        }

        const { startTime = undefined, endTime = undefined } = updatedSlaMap[id];

        // We always recalculate start times and end times, in case the config has been edited.
        const newStartTime = getStartTime(actions, startCondition);
        const startTimeHasChanged: boolean = newStartTime !== startTime;
        const newEndTime = startTime || newStartTime ? getEndTime(actions, endCondition, startTime || newStartTime) : undefined;
        const endTimeHasChanged: boolean = newEndTime !== endTime;
    
        if (startTimeHasChanged) {
            hasChanged = true;
            updatedSlaMap[id].startTime = newStartTime;
        }

        if (endTimeHasChanged) {
            hasChanged = true;
            updatedSlaMap[id].endTime = newEndTime;
        }
    });

    return hasChanged ? updatedSlaMap : undefined;
};

// Find and remove any data from configs that have been since-deleted
const getSlaDataWithRemovals = (configs: SlaConfiguration[], slaMap: SlaDataMap): SlaDataMap | void => {
    const keys = Object.keys(slaMap);
    if (keys.length === 0) {
        return undefined;
    }
    const configIds = configs.map(config => config.id);

    let removed = undefined;
    keys.forEach(key => {
        if (configIds.indexOf(key) === -1) {
            removed = true;
            delete slaMap[key];
        }
    });

    return removed ? slaMap : undefined;
};

export const updateConfigs = (t: any, configs: SlaConfiguration[], slaMap: SlaDataMap): void => {
    getCardActions(t).then((actions) => {
        const updatedSlaData = getUpdatedSlaData(actions, configs, slaMap);
        if (updatedSlaData) {
            const slaDataWithRemovals = getSlaDataWithRemovals(configs, updatedSlaData);
            const result = slaDataWithRemovals ? slaDataWithRemovals : updatedSlaData;
            setSlaData(t, result);
        } else {
            const slaDataWithRemovals = getSlaDataWithRemovals(configs, slaMap);
            if (slaDataWithRemovals) {
                setSlaData(t, slaDataWithRemovals);
            }
        }
    });
};

export const getActionsPerCard = (actions: BoardAction[]): {[key: string]: CardAction[]} => {
    const map = {};
    actions.forEach(action => {
        if (map[action.data.card.id] === undefined) {
            map[action.data.card.id] = [];
        }
        map[action.data.card.id].push(action);
    });
  
    return map;
};

// https://gist.github.com/jed/982883
export const generateUuid = function (): string { return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/1|0/g, function () { return (0 | Math.random() * 16).toString(16); }); };
