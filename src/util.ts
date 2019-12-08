declare const moment: any;

import { setSlaData, SlaDataMap, SlaData, SlaConfiguration, getCardActions, CardAction, CardActionType, SlaCondition } from './trello-util';

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

export const getMinutesRemaining = (startTime: number, endTime: number, config: SlaConfiguration): number => {
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
    return 'yellow'
  }
  return 'green';
};

export const getRunningSlas = (data: SlaDataMap, configs: SlaConfiguration[], detailed: boolean): CardBadge[] | CardDetailedBadge[] => {
  const runningSlas = [];
  const completeSlas = [];
  
  configs.forEach((config) => {
    if (data[config.id]) {
      const { startTime, endTime } = data[config.id];
      if (startTime && !endTime) {
        const unix = moment().valueOf();
        const minutesRemaining = getMinutesRemaining(startTime, unix, config);
        const humanReadable = getHumanReadableTime(minutesRemaining);
        runningSlas.push({
          text: humanReadable,
          color: getColor(minutesRemaining, false),
          ...(detailed ? { title: config.name } : {}),
          ...(!detailed ? {icon: `${window.location}img/stopwatch.svg`} : {}),
          refresh: 60,
        });
      }

      if (startTime && endTime && detailed) {
        const minutesRemaining = getMinutesRemaining(startTime, endTime, config);
        const humanReadable = getHumanReadableTime(minutesRemaining);
        completeSlas.push({
          text: humanReadable,
          color: getColor(minutesRemaining, true),
          title: config.name,
          refresh: 60
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
    if (action.type === CardActionType.createCard && action.data.list.id === startCondition.id) {
      startTime = moment(action.date).valueOf();
    } else if (action.type === CardActionType.updateCard &&
      action.data.listAfter.id === startCondition.id &&
      !startTime || (moment(action.date).valueOf() < startTime)) {
        startTime = moment(action.date).valueOf();
    }
  });

  return startTime;
};

export const getUpdatedConfigs = (actions: CardAction[], configs: SlaConfiguration[], slaMap: SlaDataMap): SlaDataMap | void => {
  const updatedSlaMap = slaMap;
  let hasChanged: boolean = false;

  configs.forEach(config => {
    const { id, startCondition, endCondition } = config;

    if (!updatedSlaMap[id]) {
      updatedSlaMap[id] = {};
    }

    const { startTime = undefined, endTime = undefined } = updatedSlaMap[id];

    const newStartTime = !startTime ? getStartTime(actions, startCondition) : undefined;

    const startTimeExists: number | void =  startTime ? startTime : newStartTime;
    const newEndTime = startTimeExists && !endTime ? getEndTime(actions, endCondition, startTimeExists) : undefined;
    
    if (newStartTime) {
      hasChanged = true;
      updatedSlaMap[id].startTime = newStartTime;
    }

    if (newEndTime) {
      hasChanged = true;
      updatedSlaMap[id].endTime = newEndTime;
    }
  });

  return hasChanged ? updatedSlaMap : undefined;
};

export const updateConfigs = (t: any, configs: SlaConfiguration[], slaMap: SlaDataMap): void => {
  getCardActions(t).then((actions) => {
   const updatedConfigs = getUpdatedConfigs(actions, configs, slaMap);
    if (updatedConfigs) {
      setSlaData(t, updatedConfigs);
    }
  });
};


