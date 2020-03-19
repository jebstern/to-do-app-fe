export interface Item {
  id: string
  dueDate?: number
  title: string
  text: string
  completed: boolean
}

export interface NewItemProps {
  add: any
}

export interface ItemSelectProps {
  label: any
  selected: any
  select: any
  unSelect: any
  disabled?: any
}

export interface ItemProps {
  item: Item
}

export interface ListItemProps {
  items: Item[]
  newItemLoading: boolean
  deleteItem: any
  update: any
}

export interface FilterProps {
  handleCompletedChanged: any
  includeCompleted: boolean
}
