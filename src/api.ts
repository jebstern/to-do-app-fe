import { Item } from "./types";

const storageKey = "TODO_ITEMS";
const delayMs = 1000;

function getFromStorage(): Item[] {
    const fromStorage = localStorage.getItem(storageKey);
    return fromStorage ? JSON.parse(fromStorage) : [];
}

function get(): Promise<Item[]> {
    return new Promise(resolve => {
        setTimeout(() => resolve(getFromStorage()), delayMs);
    });
}

function complete(id: number): Promise<Item[]> {
    return new Promise(resolve => {
        const items = getFromStorage();
        const updatedItems = items.map((item: Item) => (item.id === id ? { ...item, complete: true } : item));
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        setTimeout(() => resolve(updatedItems), delayMs);
    });
}

function add(item: Item): Promise<Item[]> {
    return new Promise(resolve => {
        const items = getFromStorage();
        const newId = items.reduce((id, item) => (item.id >= id ? item.id + 1 : id), 1);
        const updatedItems = [...items, { ...item, id: newId }];
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        setTimeout(() => resolve(updatedItems), delayMs);
    });
}

export default { get, complete, add };
