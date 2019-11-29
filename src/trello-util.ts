// Right now we only provide being in a column as starting the SLA
enum Condition {
    ColumnName = "COLUMN_NAME",
}

type SlaCondition = {
    conditionType: Condition;
    condition: string;
}

export type SlaConfiguration = {
    id: number;
    name: string;
    startCondition: SlaCondition;
    endCondition: SlaCondition;
    time: number; // Minutes
}

export type SlaData = {
    startTime?: number; // In UTC. Only exists if SLA has started
    endTime?: number; // In UTC. Only exists if SLA has ended
}

export type SlaDataMap = {
    [id: number]: SlaData;
}

// TODO: get can technically return nothing - is it null, undefined?
export const getConfiguration = (t): Promise<SlaConfiguration[]> => t.get('board', 'shared', 'config');
export const setConfiguration = (t, config: SlaConfiguration[]): void => t.set('board', 'shared', 'config', config);
export const getSlaData = (t): Promise<SlaDataMap> => t.get('card', 'shared', 'slaData');
export const setSlaData = (t, slaData: SlaDataMap): void => t.set('card', 'shared', 'slaData', slaData);
