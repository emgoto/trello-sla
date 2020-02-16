import { CreateCardAction, UpdateCardAction, CardActionType, SlaCondition, Condition, BoardAction } from '../trello-util';

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