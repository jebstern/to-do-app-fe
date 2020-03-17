export interface Item {
  id: number
  timestampDue: number
  title: string
  complete: boolean
}

export interface NewItemProps {
  add: any
}

export interface HeaderProps {
  filter: any
  addItem: any
  setFilter: any
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
}
