import { getSlaData, getConfigurations, Condition } from './trello-util';
import { getRunningSlas, updateConfigs } from './util';

declare const TrelloPowerUp: any;

window.Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
  // Button to open settings 
  'board-buttons': function (t) {
    return [{
      icon: {
        dark: `${window.location}img/stopwatch.svg`,
        light: `${window.location}img/stopwatch.svg`,
      },
      text: 'SLAs',
      callback: (): void => t.modal({
        url: './settings.html',
        height: 360,
        fullscreen: false,
        title: 'SLA Settings'
      }),
      condition: 'edit'
    }];
  },
  // Show running SLAs on front of card
  'card-badges': function (t) {
    return getConfigurations(t).then((configs) => {
      if (!configs) {
        return [];
      }

      return getSlaData(t).then((data) => {
        updateConfigs(t, configs, data || {});
        return !data ? [] : getRunningSlas(data, configs, false);
      });
    });
  },
  // Show running and completed SLAs on back of card
  'card-detail-badges': function (t) {
    return getSlaData(t).then((data) => {
      if (!data) {
        return [];
      }
      return getConfigurations(t).then((configs) => {
        return !configs ? [] : getRunningSlas(data, configs, true);
      });
    });
  },
},
  {
    appKey: 'bd1e7e486269d148ecd1be71ad5a3f1a', // TODO: get new appKey
    appName: 'SLAs '
  });
