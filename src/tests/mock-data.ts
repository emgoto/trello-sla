import { BoardAction, CreateCardAction, UpdateCardAction, CardActionType, SlaCondition, Condition } from '../trello-util';

export const createCardAction = (listId: string, date: string): CreateCardAction => ({
    data: {
        list: {id: listId}
    },
    type: CardActionType.createCard,
    date,
    id: '123',
});

export const updateCardAction = (afterListId: string, date: string): UpdateCardAction => ({
    data: {
        listBefore: {id: "1"},
        listAfter: {id: afterListId},
    },
    type: CardActionType.updateCard,
    date,
    id: '123', 
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