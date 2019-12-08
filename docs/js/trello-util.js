var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const key = 'bd1e7e486269d148ecd1be71ad5a3f1a';
// Right now we only provide being in a column as starting the SLA
export var Condition;
(function (Condition) {
    Condition["ColumnName"] = "COLUMN_NAME";
})(Condition || (Condition = {}));
export var CardActionType;
(function (CardActionType) {
    CardActionType["createCard"] = "createCard";
    CardActionType["updateCard"] = "updateCard";
})(CardActionType || (CardActionType = {}));
// TODO: get can technically return nothing - is it null, undefined?
export const getConfigurations = (t) => t.get('board', 'shared', 'config');
export const setConfigurations = (t, config) => t.set('board', 'shared', 'config', config);
export const getSlaData = (t) => t.get('card', 'shared', 'slaData');
export const setSlaData = (t, slaData) => t.set('card', 'shared', 'slaData', slaData);
export const getCardActions = (t) => __awaiter(void 0, void 0, void 0, function* () {
    const { card: cardId } = t.getContext();
    const token = '5a70757bc71cc80fe52d34625a063a8ee57e1d0810b65bdd3213bfcaee3bafc8'; // TODO: don't commit this
    const url = `https://api.trello.com/1/cards/${cardId}/actions?filter=updateCard:idList,createCard&key=${key}&token=${token}`;
    return axios.get(url).then(response => response.data).catch((e) => {
        console.log('Failed to get card actions', e);
    });
});
//# sourceMappingURL=trello-util.js.map