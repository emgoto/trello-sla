export type ChecklistItem = {
    text: string;
    id?: string; // uuid - only required once notification is being used
    isComplete?: boolean;
    username?: string;
    fullName?: string;
    userId?: string;
    avatarHash?: string;// last known avatarHash //TODO: need to re-get it in case it has changed
    dueDate?: number;
    dueDateFriendly?: string; // Date in human readbable format e.g. 1 Jan 12:00pm
    notificationOffset?: number; // Minutes before the dueTime we want to send the notification. -1 if no notification.
}

export type User = {
    id: string;
    username: string;
}

export const getItems = (t): Promise<ChecklistItem[]> => t.get('card', 'shared', 'items');
export const setItems = (t, items: ChecklistItem[]): Promise<ChecklistItem[]> => t.set('card', 'shared', 'items', items);
export const getIsChecklistEnabled = (t): Promise<boolean> => getItems(t).then((items: ChecklistItem[]) => items ? true : false);
export const getToken = (t): Promise<string> => t.get('member', 'private', 'authToken');
export const setToken = (t, token): Promise<void> => t.set('member', 'private', 'authToken', token);
export const getUsers = (t): Promise<User[]> => t.get('board', 'shared', 'users');
export const setUsers = (t, users: User[]): Promise<void> => t.set('board', 'shared', 'users', users);