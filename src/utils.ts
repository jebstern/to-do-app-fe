import { Item } from './types'

export const isOverdue = (item: Item) => !item.complete && item.timestampDue < new Date().getTime();
