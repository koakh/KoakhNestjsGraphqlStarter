import { ColDef, DataGrid, RowParams } from '@material-ui/data-grid';
import * as React from 'react';

interface Props {
  columns: ColDef[],
  rows: any[],
  attributes?: {
    pageSize?: number;
    onRowClick?: (param: RowParams) => void,
  }
}

// helper function to convert dataQuery to dataTable data, required to use function expression to use <T> generic and not clash with jsx
export const queryDataToDataTableRows = function <T>(columns: ColDef[], data: T[]): any[] {
  const rows: any[] = [];
  data.forEach((e: T) => {
    // init empty object
    const row: any = {}
    columns.forEach((c: ColDef) => {
      row[c.field] = (typeof (e as any)[c.field] === 'object') ? JSON.stringify({ ...(e as any)[c.field], __typename: undefined }) : (e as any)[c.field];
    });
    rows.push(row);
  })
  return rows;
}

export const modalPropertyColumns: ColDef[] = [
  { field: 'id', hide: true },
  { field: 'prop', headerName: 'Prop', width: 160, align: 'right' },
  { field: 'value', headerName: 'Value', width: 340 },
];

export const objectPropsToDataTableRows = (data: any): any[] => {
  const rows: any[] = [];
  Object.keys(data).forEach((e: string) => {
    const row: any = {}
    row['id'] = e;
    row['prop'] = e;
    row['value'] = (typeof data[e] === 'object') ? JSON.stringify({ ...data[e], __typename: undefined }) : data[e];
    rows.push(row);
  })
  return rows;
}

export const CustomDataTable: React.FC<Props> = ({ rows, columns, attributes }) => {
  return (
    <div style={{ width: '100%', height: 423 }}>
      <DataGrid rows={rows} columns={columns} {...attributes} />
    </div>
  );
}
