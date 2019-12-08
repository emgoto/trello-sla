import { CardActionType, Condition } from '../trello-util';
export const createCardAction = (listId, date) => ({
    data: {
        list: { id: listId }
    },
    type: CardActionType.createCard,
    date,
});
export const updateCardAction = (afterListId, date) => ({
    data: {
        listBefore: { id: "1" },
        listAfter: { id: afterListId },
    },
    type: CardActionType.updateCard,
    date,
});
export const slaCondition = (listId) => ({
    type: Condition.ColumnName,
    id: listId,
});
//# sourceMappingURL=mock-data.js.map