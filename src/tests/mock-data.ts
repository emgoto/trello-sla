import { CreateCardAction, UpdateCardAction, CardActionType, SlaCondition, Condition } from '../trello-util';

export const createCardAction = (listId: string, date: string): CreateCardAction => ({
    data: {
        list: {id: listId}
    },
    type: CardActionType.createCard,
    date,
});

export const updateCardAction = (afterListId: string, date: string): UpdateCardAction => ({
    data: {
        listBefore: {id: "1"},
        listAfter: {id: afterListId},
    },
    type: CardActionType.updateCard,
    date, 
});

export const slaCondition = (listId: string): SlaCondition => ({
    type: Condition.ColumnName,
    id: listId,
});
