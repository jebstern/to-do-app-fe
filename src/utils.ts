import { Item } from './types'

export const isOverdue = (item: Item) => (item.dueDate === null || item.dueDate === undefined) ? false : !item.completed && item.dueDate < new Date().getTime();
