import React from 'react';
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import styled from 'styled-components';

interface TableProps {
  data?: GridRowModel[];
  columns?: GridColDef[];
}

const CustomTable: React.FC<TableProps> = ({ data = [], columns = [] }) => {
  return <DataGridCustom data={!!data.length} rows={data} columns={columns} pagination hideFooterSelectedRowCount />;
};

export default CustomTable;

const DataGridCustom = styled(DataGrid)<{ data?: boolean }>`
  .MuiDataGrid-virtualScrollerContent {
    ${({ data }) => (data ? ` background-color: var(--body-2-color);` : '')}
  }
  .MuiDataGrid-footerContainer {
    background-color: var(--body-2-color);
  }

  .MuiDataGrid-row.Mui-selected,
  .MuiDataGrid-row.Mui-selected:hover,
  .MuiDataGrid-row:hover:hover {
    background-color: var(--text-color);
  }
  .headerClass {
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: 400;
    background-color: var(--text-color);
  }
  .MuiDataGrid-columnsContainer {
    background-color: var(--text-color);
    border: 1px solid var(--header-color);
  }
  .MuiDataGrid-iconSeparator {
    display: none;
  }
  .cellClass {
    font-size: 1rem;
    font-weight: 200;
    color: #111135;
  }
  .multi-line-cell {
    line-height: 1.4rem !important;
  }
  .MuiDataGrid-row {
    background-color: var(--text-color);
  }
`;
