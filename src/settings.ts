declare const TrelloPowerUp: any;
const t = TrelloPowerUp.iframe();

import { getConfigurations, setConfigurations, SlaConfiguration, Condition, getLists } from './trello-util';
import { getHumanReadableTime } from './util';

let lists = [];

const START_SELECT = '.start-select';
const END_SELECT = '.end-select';
const HOURS_INPUT = '.hours-input';
const MINUTES_INPUT = '.minutes-input'
const NAME_INPUT = '.name-input';

const stringToNode = (domString: string): Node => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = domString;
  return wrapper.firstChild;
};

const columnIdToName = (id: string): string => {
  const list = lists.find(list => list.id === id);
  return list.name;
}

const createOptionsForNewRow = (isStart: boolean): Element[] =>
  isStart ? createOptions(lists[0].id, lists[1].id) : createOptions(lists[1].id, lists[0].id);

const createOptions = (currentValue: string, filteredValue: string): Element[] => {
  const options = [];
  lists.forEach(list => {
    if (list.id !== filteredValue) {
      let option = document.createElement('option');
      option.setAttribute('value', list.id);
      option.appendChild(document.createTextNode(list.name));
  
      if (list.id === currentValue) {
        option.selected = true;
      }
      options.push(option);
    }
  });
  return options;
}

const getConfigString = (config: SlaConfiguration, withRowDiv: boolean = true): string => 
  `${withRowDiv ? '<div class="row clickable">' : ''}
      <div class="col0">${config.name}</div>
      <div class="col1">
        <span class="condition-type">Start when card is in list</span>
        <br>${columnIdToName(config.startCondition.id)}
        <br><span class="condition-type">Ends when card is in list</span>
        <br>${columnIdToName(config.endCondition.id)}
      </div>
      <div class="col2">Duration: ${getHumanReadableTime(config.time)}</div>
      <div class="col3"><button id="delete-btn" class="mod-bottom">Delete</button></div>
  ${withRowDiv ? '</div>' : ''}`;
  
const renderConfig = (config: SlaConfiguration, withRowDiv: boolean = true): Node => 
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
      <input class="hours-input" type="number" min="0" oninput="validity.valid||(value='')" value="${config ? Math.floor(config.time / 60) : 1}"></input><span>h</span>
      <input class="minutes-input" type="number" min="0" oninput="validity.valid||(value='')" value="${config ? config.time - Math.floor(config.time / 60) * 60 : 30}"></input><span>min</span>
    </div>
    <div class="col3">
        <button id="save-btn" class="mod-primary mod-bottom">Save</button>
        <button id="cancel-btn" class="mod-bottom">Cancel</button>
    </div>`;

  return domString;
}

const renderAddRow = (withRowDiv: boolean = true): Node => 
  stringToNode(getAddRowString(withRowDiv));

const getAddRowString = (withRowDiv: boolean = true): string =>
  `${withRowDiv ? '<div class="row clickable">' : ''}
  <div class="add-row">
  Add SLA
  </div>
  ${withRowDiv ? '</div>' : ''}`;

async function onSave(e: Event) {
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
      id: '1',
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
    configs[index].name = name;
  }

  await setConfigurations(t, configs);

  // TODO: need to loop through SLAs and reset ones that have changed
}

async function onCancel(e: Event) {
  const rowDiv = this.parentElement.parentElement;
  const index = [...rowDiv.parentElement.children].indexOf(rowDiv);
  const configs = await getConfigurations(t) || [];

  rowDiv.classList.remove('editing');

  if ( index > configs.length - 1) {
    rowDiv.innerHTML = getAddRowString(false);
    
  } else {
    rowDiv.innerHTML = getConfigString(configs[index], false);
  }

  // Unfreeze all rows and delete btns
  const allRows = rowDiv.parentElement.children;
  [].forEach.call(allRows, function(row) { 
    row.classList.add('clickable');
  });
  const allDeleteBtns = document.querySelectorAll('#delete-btn');
  [].forEach.call(allDeleteBtns, function(btn) {
    btn.disabled = false;
  });
}

async function onDelete(e: Event) {
  const rowDiv = this.parentElement.parentElement;
  const index = [...rowDiv.parentElement.children].indexOf(rowDiv);
  const configs = await getConfigurations(t) || [];
  configs.splice(index);
  await setConfigurations(t, configs);
}

function onSelectOptionChange(isStart: boolean) {
  return function fn(e: Event) {
    const rowDiv = this.parentElement.parentElement;
    const select = isStart ? rowDiv.querySelector(END_SELECT) : rowDiv.querySelector(START_SELECT);
    const options = createOptions(select.selectedOptions[0].value, this.selectedOptions[0].value);
    select.innerHTML = undefined;
    options.forEach(option => {
      select.appendChild(option);
    })
  }
}

async function onRowClick(e: Event): Promise<void> {
  if (!this.classList.contains('clickable')) {
    return;
  }

  // Freeze all other rows and delete btns
  this.classList.add('editing');
  const allRows = this.parentElement.children;
  [].forEach.call(allRows, function(row) { 
    row.classList.remove('clickable');
  });
  const allDeleteBtns = document.querySelectorAll('#delete-btn');
  [].forEach.call(allDeleteBtns, function(btn) {
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
  const endSelect = this.querySelector(END_SELECT)

  // If change option, need to make sure that the option is not present in the other select
  startSelect.addEventListener("change", onSelectOptionChange(true));
  endSelect.addEventListener("change", onSelectOptionChange(false));
  this.querySelector('#save-btn').onclick = onSave;
  this.querySelector('#cancel-btn').onclick = onCancel;

  startOptions.forEach(option => {
    startSelect.appendChild(option);
  })
  endOptions.forEach(option => {
    endSelect.appendChild(option);
  });
}

t.render(async function () {
  lists = await getLists(t);

  // TODO: If only one or 0 lists, can't do anything.

  // TODO: If no auth, show auth screen

  const configs = await getConfigurations(t) || [];

  const container = document.getElementById('container');

  container.innerHTML = '';

  configs.forEach((config) => {
    container.appendChild(renderConfig(config));
  });

  container.appendChild(renderAddRow());

  const rows = document.querySelectorAll('.row') as NodeListOf<HTMLElement>;
  Array.from(rows).forEach(row => row.onclick = onRowClick);

  const deleteButtons = document.querySelectorAll('#delete-btn') as NodeListOf<HTMLElement>;
  Array.from(deleteButtons).forEach(btn => btn.onclick = onDelete);
  
  t.sizeTo(document.getElementById('wrapper'));
});
  