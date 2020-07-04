declare const TrelloPowerUp: any;
const t = TrelloPowerUp.iframe();
declare const Trello: any;

import { getConfigurations, setConfigurations, SlaConfiguration, Condition, getLists, getToken, setToken } from './trello-util';
import { getHumanReadableTime, generateUuid, truncate } from './util';

let lists = [];

const START_SELECT = '.start-select';
const END_SELECT = '.end-select';
const HOURS_INPUT = '.hours-input';
const MINUTES_INPUT = '.minutes-input';
const NAME_INPUT = '.name-input';
const MEATBALLS_BTN = '#meatballs-btn';

const stringToNode = (domString: string): Node => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = domString;
    return wrapper.firstChild;
};

const columnIdToName = (id: string): string => {
    const list = lists.find(list => list.id === id);
    return list ? list.name : 'List no longer exists';
};

const createOptions = (currentValue: string, filteredValue: string): Element[] => {
    const options = [];
    lists.forEach(list => {
        if (list.id !== filteredValue) {
            const option = document.createElement('option');
            option.setAttribute('value', list.id);
            option.appendChild(document.createTextNode(list.name));

            if (list.id === currentValue) {
                option.selected = true;
            }
            options.push(option);
        }
    });
    return options;
};


const createOptionsForNewRow = (isStart: boolean): Element[] =>
    isStart ? createOptions(lists[0].id, lists[1].id) : createOptions(lists[1].id, lists[0].id);


const getConfigString = (config: SlaConfiguration, withRowDiv = true): string => 
    `${withRowDiv ? '<div class="row clickable">' : ''}
      <div class="col0">${truncate(config.name, 40, true)}</div>
      <div class="col1">
        <span class="condition-type">Start when card is in list</span>
        <br>${truncate(columnIdToName(config.startCondition.id), 20, true)}
        <br><span class="condition-type">Ends when card is in list</span>
        <br>${columnIdToName(config.endCondition.id)}
      </div>
      <div class="col2">Duration: ${getHumanReadableTime(config.time)}</div>
      <div class="col3">
        <button id="meatballs-btn" class="mod-bottom"></button>
      </div>
  ${withRowDiv ? '</div>' : ''}`;
  
const renderConfig = (config: SlaConfiguration, withRowDiv = true): Node => 
    stringToNode(getConfigString(config, withRowDiv));

const getConfigEditMode = (config?: SlaConfiguration): string => {
    const domString = `
    <div class="col0">
      <input class="name-input" value=${config ? `"${config.name}"` : "SLA Name"}></input>
    </div>
    <div class="col1">
      <span class="condition-type">Start when card is in list</span>
      <br><select class="start-select"></select>
      <br><span class="condition-type">End when card is in list</span>
      <br><select class="end-select"></select>
    </div>
    <div class="col2">
      <input class="hours-input" type="number" min="0" max="10000" oninput="validity.valid||(value='')" value="${config ? Math.floor(config.time / 60) : 1}"></input><span>h</span>
      <input class="minutes-input" type="number" min="0" max="10000" oninput="validity.valid||(value='')" value="${config ? config.time - Math.floor(config.time / 60) * 60 : 30}"></input><span>min</span>
    </div>
    <div class="col3">
        <button id="save-btn" class="mod-primary mod-bottom">Save</button>
        <button id="cancel-btn" class="mod-bottom">Cancel</button>
    </div>`;

    return domString;
};

const getAddRowString = (withRowDiv = true): string =>
    `${withRowDiv ? '<div class="row clickable">' : ''}
  <div class="add-row">
  Add SLA
  </div>
  ${withRowDiv ? '</div>' : ''}`;

const renderAddRow = (withRowDiv = true): Node => 
    stringToNode(getAddRowString(withRowDiv));


const renderNotEnoughListsMessage = (): Node =>
    stringToNode(`<div class="center"><p>This Power-Up requires you to have at least two lists! </p></div>`);

async function onSave(e: Event): Promise<void> {
    const rowDiv = this.parentElement.parentElement;
    const index = [...rowDiv.parentElement.children].indexOf(rowDiv);

    const start = rowDiv.querySelector(START_SELECT).selectedOptions[0].value;
    const end = rowDiv.querySelector(END_SELECT).selectedOptions[0].value;
    const hours = rowDiv.querySelector(HOURS_INPUT).value || 0;
    const minutes = rowDiv.querySelector(MINUTES_INPUT).value || 0;
    const name = rowDiv.querySelector(NAME_INPUT).value || '';

    const time = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

    const configs = await getConfigurations(t) || [];

    let newRow = false;
    if ( index > configs.length - 1) {
        newRow = true;
    }

    if (newRow) {
        const row = {
            id: generateUuid(),
            startCondition: {
                type: Condition.ColumnName,
                id: start
            },
            endCondition: {
                type: Condition.ColumnName,
                id: end,
            },
            time,
            name,
        };
        configs.push(row);
    } else {
        configs[index].startCondition.id = start;
        configs[index].endCondition.id = end;
        configs[index].time = time;
        configs[index].name = truncate(name, 50, false);
    }

    await setConfigurations(t, configs);
}

async function showMeatballsMenu(event): Promise<void> {
    event.stopImmediatePropagation();

    const rowDiv = this.parentElement.parentElement;
    const index = [...rowDiv.parentElement.children].indexOf(rowDiv);
    const configs = await getConfigurations(t) || [];

    // Gets the current config, and removes it from the configs list
    const currentConfig = configs.splice(index, 1);

    const report = {
        text: 'Generate report (.csv)',
        callback: async function (): Promise<void> {
            t.popup({
                title: 'Generating report',
                url: './report.html',
                args: { currentConfig: currentConfig[0] },  
                height: 50,
                mouseEvent: event,
            });
        },
    };

    const deleteSla = {
        text: 'Delete SLA',
        callback: async function (t2): Promise<void> {
            await setConfigurations(t, configs);
            t2.closePopup();
        },
    };

    t.popup({
        title: 'Options',
        mouseEvent: event,
        items: [report, deleteSla],
    });
}

function onSelectOptionChange(isStart: boolean) {
    return function fn(): void {
        const rowDiv = this.parentElement.parentElement;
        const select = isStart ? rowDiv.querySelector(END_SELECT) : rowDiv.querySelector(START_SELECT);
        const options = createOptions(select.selectedOptions[0].value, this.selectedOptions[0].value);
        select.innerHTML = undefined;
        options.forEach(option => {
            select.appendChild(option);
        });
    };
}


async function onCancel(): Promise<void> {
    const rowDiv = this.parentElement.parentElement;
    const index = [...rowDiv.parentElement.children].indexOf(rowDiv);
    const configs = await getConfigurations(t) || [];

    rowDiv.classList.remove('editing');

    if ( index > configs.length - 1) {
        rowDiv.innerHTML = getAddRowString(false);
    
    } else {
        rowDiv.innerHTML = getConfigString(configs[index], false);
    }

    // Unfreeze all rows and meatballs menus
    const allRows = rowDiv.parentElement.children;
    [].forEach.call(allRows, function(row) { 
        row.classList.add('clickable');
    });
    const allMeatballsBtns = document.querySelectorAll(MEATBALLS_BTN);
    [].forEach.call(allMeatballsBtns, function(btn) {
        btn.disabled = false;
        btn.onclick = showMeatballsMenu;
    });
}

async function onRowClick(): Promise<void> {
    if (!this.classList.contains('clickable')) {
        return;
    }

    // Freeze all other rows and delete btns
    this.classList.add('editing');
    const allRows = this.parentElement.children;
    [].forEach.call(allRows, function(row) { 
        row.classList.remove('clickable');
    });
    const meatballsBtns = document.querySelectorAll(MEATBALLS_BTN);
    [].forEach.call(meatballsBtns, function(btn) {
        btn.disabled = true;
    });

    const index = [...this.parentElement.children].indexOf(this);
    const configs: SlaConfiguration[] = await getConfigurations(t) || [];

    let newRow = false;
    if ( index > configs.length - 1) {
        newRow = true;
    }

    const config = newRow ? undefined : configs[index];

    this.innerHTML = getConfigEditMode(config);

    const startOptions = newRow ? createOptionsForNewRow(true) : createOptions(config.startCondition.id, config.endCondition.id);
    const endOptions = newRow ? createOptionsForNewRow(false) : createOptions(config.endCondition.id, config.startCondition.id);

    const startSelect = this.querySelector(START_SELECT);
    const endSelect = this.querySelector(END_SELECT);

    // If change option, need to make sure that the option is not present in the other select
    startSelect.addEventListener("change", onSelectOptionChange(true));
    endSelect.addEventListener("change", onSelectOptionChange(false));
    this.querySelector('#save-btn').onclick = onSave;
    this.querySelector('#cancel-btn').onclick = onCancel;

    startOptions.forEach(option => {
        startSelect.appendChild(option);
    });
    endOptions.forEach(option => {
        endSelect.appendChild(option);
    });
}

function onAuthenticate() {
    return Trello.authorize({
        type: "popup",
        name: "SLAs for Trello",
        expiration: "never",
        // eslint-disable-next-line @typescript-eslint/camelcase
        return_url:"https://emgoto.github.io/trello-sla/", 
        success: () => {
            setToken(t, Trello.token());
        },
        error: () => { },
    });
};

const renderAuthenticateButton = () => 
    stringToNode(`<div class="center"><p>To view and configure SLAs, you will need to first authenticate with SLAs for Trello.</p><button id="authenticate-btn" class="mod-bottom">Authenticate</button><p></p></div>`);

t.render(async function () {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const token = await getToken(t);
    if (!token) {
        container.appendChild(renderAuthenticateButton());
        document.getElementById('authenticate-btn').onclick = onAuthenticate;
        t.sizeTo(document.getElementById('wrapper'));
        return;
    }

    lists = await getLists(t);

    if (lists.length < 2) {
        container.appendChild(renderNotEnoughListsMessage());
        t.sizeTo(document.getElementById('wrapper'));
        return;
    }

    const configs = await getConfigurations(t) || [];

    configs.forEach((config) => {
        container.appendChild(renderConfig(config));
    });

    container.appendChild(renderAddRow());

    const rows = document.querySelectorAll('.row') as NodeListOf<HTMLElement>;
    Array.from(rows).forEach(row => row.onclick = onRowClick);

    const meatballsBtns = document.querySelectorAll(MEATBALLS_BTN) as NodeListOf<HTMLElement>;
    Array.from(meatballsBtns).forEach(btn => btn.onclick = showMeatballsMenu);
  
    t.sizeTo(document.getElementById('wrapper'));
});
