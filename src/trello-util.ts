declare const axios: any;

const key = 'bd1e7e486269d148ecd1be71ad5a3f1a';
const token = ''; // TODO use auth

// Right now we only provide being in a column as starting the SLA
export enum Condition {
    ColumnName = "COLUMN_NAME",
}

export enum CardActionType { 
    createCard = "createCard",
    updateCard = "updateCard"
}

export type SlaCondition = {
    type: Condition;
    id: string;
}

export type SlaConfiguration = {
    id: string;
    name: string;
    startCondition: SlaCondition;
    endCondition: SlaCondition;
    time: number; // Minutes
}

export type SlaData = {
    startTime?: number; // Unix timestamp milliseconds. Only exists if SLA has started
    endTime?: number; // Unix timestamp in milliseconds. Only exists if SLA has ended
}

export type SlaDataMap = {
    [id: number]: SlaData;
}

export type CardAction = CreateCardAction | UpdateCardAction;

export type UpdateCardAction = {
    data: {
        listAfter: {id: string};
        listBefore: {id: string};
    };
    type: typeof CardActionType.updateCard;
    date: string; // format 2019-11-29T21:05:28.510Z
}

export type CreateCardAction = {
    data: {
        list: {id: string};
    };
    type: typeof CardActionType.createCard;
    date: string; // format 2019-11-29T21:05:28.510Z
}

export type List = {
    id: string,
    name: string,
}

// TODO: get can technically return nothing - is it null, undefined?
export const getConfigurations = (t): Promise<SlaConfiguration[] | void> => t.get('board', 'shared', 'config');
export const setConfigurations = (t, config: SlaConfiguration[]): void => t.set('board', 'shared', 'config', config);
export const getSlaData = (t): Promise<SlaDataMap | void> => t.get('card', 'shared', 'slaData');
export const setSlaData = (t, slaData: SlaDataMap): void => t.set('card', 'shared', 'slaData', slaData);

export const getCardActions = async (t): Promise<CardAction[]> => {
    const { card: cardId } = t.getContext();
    const url = `https://api.trello.com/1/cards/${cardId}/actions?filter=updateCard:idList,createCard&key=${key}&token=${token}`;
    return axios.get(url).then(response => response.data).catch((e) => {
      console.log('Failed to get card actions', e);
    });
  };

export const getLists = async (t): Promise<List[]> => {
    const { board: boardId } = t.getContext();
    const url = `https://api.trello.com/1/boards/${boardId}/lists?cards=none&filter=open&key=${key}&token=${token}`;
    return axios.get(url).then(response => response.data).catch((e) => {
        console.log('Failed to get lists', e);
      });
}