declare const TrelloPowerUp: any;

import { getItems } from './trello-util';

window.Promise = TrelloPowerUp.Promise;

let checklist;

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function (t) {
    return getItems(t).then((items) => {
      if (!items) {
        return [];
      }

      // TODO: make the background green if we're at 100% completion

      return [{
        text: `0/${items.length}`,
        color: 'grey',
        icon: `${window.location}img/checkbox-icon.svg`,
      }];
    });
  },
  'card-buttons': function (t, opts) {
    // check that viewing member has write permissions on this board
    if (opts.context.permissions.board !== 'write') {
      return [];
    }
    return [{
      text: 'Checklist+',
      icon: `${window.location}img/checkbox-icon.svg`,
      callback: function (context) {
        return context.popup({
          title: 'Add Checklist+',
          url: './settings.html',
        });
      }
    }];
  },
  'card-back-section': function (t, options) {
    return getItems(t).then((items) => {
      if (items) {
        if (checklist) {
          return checklist;
        }

        // We do this to prevent the iframe from re-initialising 
        // Technically the t.render should prevent this, but it's not.
        checklist = {
          title: 'Checklist+',
          icon: `${window.location}img/tick-icon.svg`,
          content: {
            type: 'iframe',
            url: t.signUrl('./checklist.html', { items }),
            height: 280,
          },
        };
        return checklist;
      }
    }).catch((e) => console.log('Failed to render card-back-section', e));
  },
},
  {
    appKey: 'bd1e7e486269d148ecd1be71ad5a3f1a',
    appName: 'Checklist+'
  });
