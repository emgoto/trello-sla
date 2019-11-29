declare const moment: any;

import { SlaDataMap, SlaData, SlaConfiguration } from './trello-util';

type CardBadge = {
  text: string;
  color: string;
  // icon: string;
};

type CardDetailedBadge = {
  title: string;
  color: string;
  text: string;
  callback?: () => {};
};

// TODO: Convert minutes to hours, days and weeks
export const getHumanReadableTime = (minutes: number): string => {
  return minutes.toString();
};

export const getMinutesRemaining = (startTime: number, config: SlaConfiguration): number => {
  const utc = moment.utc();
  const minutesElapsed = Math.floor((utc - startTime) / 1000 / 60);
  const minutesRemaining = config.time - minutesElapsed;
  return minutesRemaining;
};

export const getRunningSlas = (data: SlaDataMap, config: SlaConfiguration[], detailed: boolean): CardBadge[] | CardDetailedBadge[] => {
  const slaIds = Object.keys(data);

  const runningSlas = slaIds.map((id) => {
    const { startTime, endTime } = data[id];
    if (startTime && !endTime) {
      const minutesRemaining = getMinutesRemaining(startTime, config[id]);
      const humanReadable = getHumanReadableTime(minutesRemaining);
      return {
        text: humanReadable,
        color: 'grey',
        ...(detailed ? { title: config[id].title } : {})
      };
    }
  });

  if (!detailed) {
    return runningSlas;
  };

  // TODO: completed SLAs need to be returned in detailed view
  return runningSlas;
};
