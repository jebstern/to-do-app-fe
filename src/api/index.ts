import { Item } from "../types";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://to-do-be.herokuapp.com/todo"
    : "http://localhost:3000/todo";

const storageKey = "TODO_ITEMS";
const delayMs = 1000;

function getFromStorage(): Item[] {
  const fromStorage = localStorage.getItem(storageKey);
  return fromStorage ? JSON.parse(fromStorage) : [];
}

async function getAll(): Promise<Item[]> {
  const res = await axios.get(`${API_URL}/items`);
  return res.data;
}

async function getIncomplete(): Promise<Item[]> {
  const res = await axios.get(`${API_URL}/incomplete`);
  return res.data;
}

function complete(id: number): Promise<Item[]> {
  return new Promise(resolve => {
    const items = getFromStorage();
    // const updatedItems = items.map((item: Item) => (item.id === id ? { ...item, completed: true } : item));
    const updatedItems = items;
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setTimeout(() => resolve(updatedItems), delayMs);
  });
}

async function update(item: Item): Promise<any> {
  try {
    return axios.put(`${API_URL}/update`, item);
  } catch (e) {
    return console.log(e);
  }
}

async function add(item: Item): Promise<any> {
  try {
    return axios.post(`${API_URL}/add`, item);
  } catch (e) {
    return console.log(e);
  }
}

function deleteItem(id: string): Promise<any> {
  return axios.delete(`${API_URL}/${id}`);
}

export default { getAll, complete, add, deleteItem, getIncomplete, update };
