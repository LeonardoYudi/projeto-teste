export interface TableRowInterface {
  [key: string]: any;
}

export interface TableColumnInterface {
  key: string;
  label: string;
  type?: string;
}

export interface ActionTableItem {
  label: string;
  action?: (item: any) => void;
}
