declare const TrelloPowerUp: any;

import { getSlaData, getConfiguration } from './trello-util';
import { getRunningSlas } from './util';

window.Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
  // Button to open settings 
  'board-buttons': function (t) {
    return [{
      icon: {
        dark: '',
        light: ''
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
    return getConfiguration(t).then((config) => {

      // TODO: loop through configurations, and see if any can be newly-applied 
      // TODO: will need to get list of actions on card, and see if move to list occurred

      return getSlaData(t).then((data) => {
        if (!data) {
          return [];
        }

        return getRunningSlas(data, config, false);
      });
    });
  },
  // Show running and completed SLAs on back of card
  'card-detail-badges': function (t) {
    return getSlaData(t).then((data) => {
      if (!data) {
        return [];
      }
      getConfiguration(t).then((config) => {
        return getRunningSlas(data, config, true);
      });
    });
  },
},
  {
    appKey: 'bd1e7e486269d148ecd1be71ad5a3f1a', // TODO: get new appKey
    appName: 'SLAs '
  });
