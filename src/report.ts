import { getBoardActions } from './trello-util';
import { getActionsPerCard, getStartTime, getEndTime, getMinutesRemaining, getHumanReadableTime } from './util';

declare const moment: any;
declare const TrelloPowerUp: any;
const t = TrelloPowerUp.iframe();

const humanReadableTimeStamp = (milliseconds: number): string =>
    moment(milliseconds).format("YYYY-MM-DD k:mm:ss");

const generateReport = async () => {
    // TODO: only returns 1000 actions, so won't work on boards with large histories
    const actions = await getBoardActions(t);
    const config = await t.arg('currentConfig');

    const actionsPerCard = getActionsPerCard(actions);
    const cardIds = Object.keys(actionsPerCard);

    let csv = "Name,Start time, End time, Time remaining\n";

    cardIds.map(cardId => {
        const cardActions = actionsPerCard[cardId];
        const startTime = getStartTime(cardActions, config.startCondition);
        let endTime;
        if (startTime) {
            csv += cardActions[0].data.card.name;
            endTime = getEndTime(cardActions, config.endCondition, startTime);
            csv += "," + humanReadableTimeStamp(startTime) + ",";
            if (endTime) {
                csv += humanReadableTimeStamp(endTime);
            }

            csv += ",";

            const minutesRemaining = getMinutesRemaining(startTime, endTime, config);
            csv += getHumanReadableTime(minutesRemaining);
            csv += '\n';
        }
    });
    
    return csv;
};

t.render(async () => {
    const report = await generateReport();
    document.querySelector('#downloadLink').classList.remove('hidden');
    document.querySelector('.loadingSpinner').classList.add('hidden');
    const button: HTMLAnchorElement= document.querySelector('#downloadLink');
    button.href = 'data:text/csv;charset=utf-8,' + encodeURI(report);
    button.target = '_blank';
    button.download = 'sla.csv';
});


// console.log(csv);
// var hiddenElement = document.createElement('a');
