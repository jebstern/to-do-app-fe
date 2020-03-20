export interface Item {
  id: string
  dueDate?: string | null
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

export interface TodoItemProps {
  item: Item
  deleteItem: any
  update: any
  editableId: string
  handleEditClicked: any
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
