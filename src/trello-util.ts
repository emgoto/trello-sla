declare const axios: any;

const key = '652d72f229f65b3457533bd55fdcf436';

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
    id: string;
    data: {
        listAfter: {id: string};
        listBefore: {id: string};
    };
    type: typeof CardActionType.updateCard;
    date: string; // format 2019-11-29T21:05:28.510Z
}

export type CreateCardAction = {
    id: string;
    data: {
        list: {id: string};
    };
    type: typeof CardActionType.createCard;
    date: string; // format 2019-11-29T21:05:28.510Z
}

type NameAndId = {
    id: string;
    name: string;
}

export type List = NameAndId;

export type BoardAction = {
    data: {
        board: NameAndId;
        card: NameAndId;
        list?: NameAndId;
        listBefore?: NameAndId;
        listAfter?: NameAndId;
    };
    date: string;
    type: CardActionType;
}

export const getConfigurations = (t): Promise<SlaConfiguration[] | void> => t.get('board', 'shared', 'config');
export const setConfigurations = (t, config: SlaConfiguration[]): void => t.set('board', 'shared', 'config', config);
export const getSlaData = (t): Promise<SlaDataMap | void> => t.get('card', 'shared', 'slaData');
export const setSlaData = (t, slaData: SlaDataMap): void => t.set('card', 'shared', 'slaData', slaData);
export const getToken = (t): Promise<string | void> => t.get('member', 'private', 'authToken');
export const setToken = (t, token): Promise<void> => t.set('member', 'private', 'authToken', token);

/**
 * TODO: the problem with getting all board actions is that there is a limit of 1000
 * And that the actions for closed cards are also counted.
 */ 
export const getBoardActions = async (t): Promise<BoardAction[]> => {
    const { board: boardId } = t.getContext();
    const token = await getToken(t);
    const url = `https://api.trello.com/1/boards/${boardId}/actions?limit=1000&filter=updateCard:idList,createCard&member=false&memberCreator=false&key=${key}&token=${token}`;
    return axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch((e) => {
            if (e && e.response && e.response.status && e.response.status === 401) {
                setToken(t, undefined);
            }
        });
};

export const getCardActions = async (t): Promise<CardAction[]> => {
    const { card: cardId } = t.getContext();
    const token = await getToken(t);
    const url = `https://api.trello.com/1/cards/${cardId}/actions?filter=updateCard:idList,createCard&key=${key}&token=${token}`;
    return axios.get(url).then(response => response.data).catch((e) => {
        if (e && e.response && e.response.status && e.response.status === 401) {
            setToken(t, undefined);
        }
    });
};

// TODO: don't need to call API for this when there is t.lists()
export const getLists = async (t): Promise<List[]> => {
    const { board: boardId } = t.getContext();
    const token = await getToken(t);
    const url = `https://api.trello.com/1/boards/${boardId}/lists?cards=none&filter=open&key=${key}&token=${token}`;
    return axios.get(url).then(response => response.data).catch((e) => {
        if (e && e.response && e.response.status && e.response.status === 401) {
            setToken(t, undefined);
        }
    });
};
