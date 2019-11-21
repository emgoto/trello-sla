declare const axios: any;
declare const moment: any;

const url = 'https://checklist-notifications.herokuapp.com';

// https://medium.com/kevin-salters-blog/reordering-a-javascript-array-based-on-a-drag-and-drop-interface-e3ca39ca25c
export const reorderArray = (event, originalArray) => {
  const movedItem = originalArray.filter((item, index) => index === event.oldIndex);
  const remainingItems = originalArray.filter((item, index) => index !== event.oldIndex);

  const reorderedItems = [
    ...remainingItems.slice(0, event.newIndex),
    movedItem[0],
    ...remainingItems.slice(event.newIndex)
  ];

  return reorderedItems;
};

export const stringToNode = (domString: string): Node => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = domString;
  return wrapper.firstChild;
};

// https://gist.github.com/jed/982883
export const generateUuid = function (): string { return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/1|0/g, function () { return (0 | Math.random() * 16).toString(16); }); };

const getNotificationTime = (dueDate: number, notificationOffset: number): string | null => {
  const notificationTime = (dueDate - notificationOffset * 60 * 1000);
  if (moment.utc().valueOf() < notificationTime) {
    return notificationTime.toString();
  } else {
    return null; // Return null if the notification time was in the past
  }
};

export const setNotification = (id, cardId, boardId, username, userId, item, dueTime, notificationOffset): Promise<any> => {
  const notificationTime: string | null = getNotificationTime(dueTime, notificationOffset);
  if (userId && notificationOffset) {
    const data = new URLSearchParams({ id, cardId, boardId, username, userId, item, dueTime: dueTime, notificationTime });
    return axios({ method: 'post', url: `${url}/notification`, data });
  }

  return Promise.resolve();
};

export const removeNotification = (itemId: string): Promise<void> => {
  const data = new URLSearchParams({ itemId });
  return axios({ method: 'DELETE', url: `${url}/notification`, data });
};

