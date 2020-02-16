import { getActionsPerCard, getStartTime, getEndTime, getColor, getHumanReadableTime } from '../util';
import { createCardAction, updateCardAction, slaCondition, createBoardAction } from './mock-data';

const octoberDate = "2019-10-01T05:10:58.000Z";
const octoberDateUnix = 1569906658000;

const novemberDate = "2019-11-29T11:17:23.180Z";
const novemberDateUnix = 1575026243180; 

const decemberDate = "2019-12-29T11:17:23.180Z";
const decemberDateUnix = 1577618243180;

describe('getStartTime', () => {
    test('should return creation time if createCard event is for the correct list', () => {
        const createCard = createCardAction("list1", novemberDate);
        const updateCard = updateCardAction("list1", decemberDate);
        expect(
            getStartTime([createCard], slaCondition("list1"))
        ).toEqual(novemberDateUnix);

        expect(
            getStartTime([updateCard, createCard], slaCondition("list1"))
        ).toEqual(novemberDateUnix);

        expect(
            getStartTime([createCard, updateCard], slaCondition("list1"))
        ).toEqual(novemberDateUnix);
    });

    test('should not return time if createCard event is for incorrect list', () => {
        expect(
            getStartTime([createCardAction("list2", novemberDate)], slaCondition("list1"))
        ).toEqual(undefined);
    });

    test('should return correct time if updateCard event is for correct list', () => {
        const updateCardNovember = updateCardAction("list1", novemberDate);
        const updateCardDecember = updateCardAction("list1", decemberDate);

        expect(
            getStartTime([updateCardNovember, updateCardDecember], slaCondition("list1"))
        ).toEqual(novemberDateUnix);

        expect(
            getStartTime([updateCardDecember, updateCardNovember], slaCondition("list1"))
        ).toEqual(novemberDateUnix);
    });
});

describe('getEndTime', () => {
    test('should return correct time after startCondition fulfilment time', () => {
        const updateCardOctober = updateCardAction("list2", octoberDate);
        const updateCardNovember = updateCardAction("list1", novemberDate);
        const updateCardDecember = updateCardAction("list2", decemberDate);
        expect(
            getEndTime([updateCardOctober, updateCardNovember, updateCardDecember], slaCondition("list2"), octoberDateUnix + 20000)
        ).toEqual(decemberDateUnix);
    });

    test('should return correct time after startCondition fulfilment time', () => {
        const updateCardOctober = updateCardAction("list2", octoberDate);
        const updateCardNovember = updateCardAction("list2", novemberDate);
        const updateCardDecember = updateCardAction("list2", decemberDate);
        expect(
            getEndTime([updateCardOctober, updateCardNovember, updateCardDecember], slaCondition("list2"), octoberDateUnix - 10000)
        ).toEqual(octoberDateUnix);
    });

    describe('getColor', () => {
        test('should return red if number is negative and not complete', () => {
            expect(getColor(-1, false)).toEqual('red');
        });
        test('should return grey if is complete', () => {
            expect(getColor(-5, true)).toEqual('grey');
        });
        test('should return yellow if number is 0 and not complete', () => {
            expect(getColor(0, false)).toEqual('yellow');
        });
        test('should return yellow if number is under an hour and not complete', () => {
            expect(getColor(50, false)).toEqual('yellow');
        });
        test('should return green if number is an hour or over and not complete', () => {
            expect(getColor(60, false)).toEqual('green');
        });
    });

    describe('getHumanReadableTime', () => {
        test('should return 0 minutes if 0', () => {
            expect(getHumanReadableTime(0)).toEqual('0min');
        });
        test('should return minutes if under 60', () => {
            expect(getHumanReadableTime(50)).toEqual('50min');
        });
        test('should return negative minutes if under 60', () => {
            expect(getHumanReadableTime(-40)).toEqual('-40min');
        });
        test('should return hours and minutes if over 60', () => {
            expect(getHumanReadableTime(100)).toEqual('1h 40min');
        });
        test('should return hours only if no minutes', () => {
            expect(getHumanReadableTime(120)).toEqual('2h');
        });
        test('should return negative hours and minutes if over 60', () => {
            expect(getHumanReadableTime(-110)).toEqual('-1h 50min');
        });
        test('should return rounded down to days only', () => {
            expect(getHumanReadableTime(1441)).toEqual('1d'); // 24 hours and 1 minute
        });
        test('should return rounded down to negativedays only', () => {
            expect(getHumanReadableTime(-1445)).toEqual('-1d'); // 24 hours and 5 minute
        });
        test('should return rounded down to days and hours', () => {
            expect(getHumanReadableTime(1500)).toEqual('1d 1h'); // 25 hours
        });
        test('should return rounded down to days and hours', () => {
            expect(getHumanReadableTime(-1799)).toEqual('-1d 5h'); // 29 hours and 59min
        });
    });
});

describe('getActionsPerCard', () => {
    test('should return map of actions per card', () => {
        const boardActions = ['1', '2', '3'].map(cardId => createBoardAction(cardId));

        const expectedResult = {
            '1': [boardActions[0]],
            '2': [boardActions[1]],
            '3': [boardActions[2]],
        };

        expect(getActionsPerCard(boardActions)).toEqual(expectedResult);
    });
});
