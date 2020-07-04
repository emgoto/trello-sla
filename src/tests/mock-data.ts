import { CreateCardAction, UpdateCardAction, CardActionType, SlaCondition, Condition, BoardAction, CardAction } from '../trello-util';

export const createCardAction = (listId: string, date: string): CreateCardAction => ({
    data: {
        list: {id: listId},
        card: {id: '1', name: 'a'}
    },
    type: CardActionType.createCard,
    date,
});

export const updateCardAction = (afterListId: string, date: string): UpdateCardAction => ({
    data: {
        listBefore: {id: "1"},
        listAfter: {id: afterListId},
        card: {id: '1', name: 'a'}
    },
    type: CardActionType.updateCard,
    date, 
});

export const slaCondition = (listId: string): SlaCondition => ({
    type: Condition.ColumnName,
    id: listId,
});

export const createBoardAction = (cardId: string): BoardAction => ({
    data: {
        board: { id: 'id', name: 'name'},
        card: { id: cardId, name: 'name'},
    },
    date: '',
    type: CardActionType.updateCard,
});

const firstList = '5eb9ca8529fc704526a1dd97';
const secondList = '5f0109614e2c3a479b0696ab';

export const startInSecondListCondition: SlaCondition = slaCondition(secondList);
export const expectedSecondListDate =  1593904560842;

const createdInFirstListAction = createCardAction(firstList, "2020-07-04T22:58:18.573Z");
const movedToSecondListAction = updateCardAction(secondList, "2020-07-04T23:16:00.842Z");

export const startInSecondListActions: CardAction[] = [movedToSecondListAction, createdInFirstListAction];

