import { getCardActions, getSlaData, getConfigurations, getToken } from './trello-util';
import { getRunningSlas, updateConfigs, updateAllConfigs } from './util';

declare const TrelloPowerUp: any;
window.Promise = TrelloPowerUp.Promise;

/**
 * When the page first renders, card-badges will be called for all the cards on the board.
 * Then board-buttons will be called. We don't want to spam the actions API for each card,
 * so we give the responsbility for calling the endpoint to the board-buttons.
 * 
 * Later, if a user moves a card between lists, card-badges will be called and we'd want to allow
 * the card-badges to then call the API as needed.
 */
let allowCardAPI = false;
setTimeout(() => {allowCardAPI = true;}, 10000);

TrelloPowerUp.initialize({
  // This only gets called on initial load
  'board-buttons': function (t) {
    updateAllConfigs(t);

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
        title: 'SLAs for Trello'
      }),
      condition: 'edit'
    }];
  },
  // This will get called each time a card is moved between lists, or t.set is called
  'card-badges': async function (t) {
    return getConfigurations(t).then(configs => {
      if (!configs) {
        return [];
      }

      return getSlaData(t).then(async (data) => {
        if (allowCardAPI) {
          const actions = await getCardActions(t);
          updateConfigs(t, configs, data || {}, actions);
        }
        return !data ? [] : getRunningSlas(data, configs, false);
      });
    });
  },
  // Show running and completed SLAs on back of card
  'card-detail-badges': function (t) {
    return getToken(t).then(token => {
      if (!token) {
        return [];
      }
      return getSlaData(t).then((data) => {
        if (!data) {
          return [];
        }
        return getConfigurations(t).then((configs) => {
          return !configs ? [] : getRunningSlas(data, configs, true);
        });
    },
    'authorization-status': function(t){
        return getToken(t)
            .then(function(authToken) {
                return { authorized: authToken != null };
            });
    },
    'show-authorization': function(t){
        return t.popup({
            title: 'SLAs for Trello',
            url: './auth.html',
            height: 100,
        });
    }  
},
{
    appKey: '652d72f229f65b3457533bd55fdcf436',
    appName: 'SLAs for Trello'
});
