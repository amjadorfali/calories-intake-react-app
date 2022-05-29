import React, { useMemo } from 'react';

import styled from 'styled-components';
import { GridColDef, GridCellParams } from '@mui/x-data-grid';
import CustomTable from './customTable';
import moment from 'moment';
import { useAuthContext } from 'auth/authContext';
import { Grid, Typography } from '@mui/material';
import { Food } from 'interfaces';

export const formatDate = (date: Date) => {
  const mom = moment(date);
  const formattedDate = mom.format('DD-MM-YY');
  const time = mom.format('hh:mm A');

  return (
    <span>
      {formattedDate}
      <br />
      {time}
    </span>
  );
};

const getCellClass = (customClass?: string) => {
  let cellClass = 'cellClass';
  if (customClass) cellClass = cellClass.concat(` ${customClass}`);
  return cellClass;
};
const columns: GridColDef[] = [
  {
    field: 'dateTaken',
    headerName: 'Date&Time',
    flex: 1.5,
    cellClassName: (params) => getCellClass('multi-line-cell'),
    renderCell: (params: GridCellParams) => formatDate(params.row.dateTaken),
    headerClassName: 'headerClass',
    align: 'center',
    minWidth: 200,
    headerAlign: 'center',
  },
  {
    field: 'isOverLimit',
    headerName: 'Passed Daily Limit?',
    flex: 1.5,
    headerClassName: 'headerClass',
    align: 'center',
    minWidth: 200,
    headerAlign: 'center',
    renderCell: (params: GridCellParams) =>
      params.row.isOverLimit ? <Typography color="warning">YES :(</Typography> : <Typography color={'secondary.main'}>Nope :)</Typography>,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1.2,
    cellClassName: (params) => getCellClass('multi-line-cell'),
    headerClassName: 'headerClass',
    align: 'center',
    minWidth: 200,
    headerAlign: 'center',
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 0.75,
    renderCell: (params: GridCellParams) => `${params.row.price} $`,
    headerClassName: 'headerClass',
    align: 'center',
    minWidth: 100,
    headerAlign: 'center',
  },

  {
    field: 'calorieValue',
    headerName: 'Calories',
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridCellParams) => `${params.row.calorieValue} Kcal`,
    headerClassName: 'headerClass',
    align: 'center',
    headerAlign: 'center',
  },
];

interface TableProps {}

const Table: React.FC<TableProps> = () => {
  const { userDetails, isFilteringByDate, filteredData } = useAuthContext();

  const tableData = useMemo(
    () => (isFilteringByDate ? filteredData : userDetails?.foodsList) || [],
    [userDetails?.foodsList, isFilteringByDate, filteredData]
  );
  const datesPassedLimit: { [key: string]: boolean } = useMemo(() => {
    const datesWithItemsKeyed: { [key: string]: Food[] } = {};
    tableData.forEach((food) => {
      const date = moment(food.dateTaken).format('DD-MM-YY');
      if (!datesWithItemsKeyed[date]) {
        datesWithItemsKeyed[date] = [food];
      } else {
        datesWithItemsKeyed[date].push(food);
      }
    });
    const datesPassedLimit: { [key: string]: boolean } = {};
    Object.entries(datesWithItemsKeyed).forEach(([date, values]) => {
      const sumOfDay = values.reduce((prev, curr) => {
        prev += curr.calorieValue;
        return prev;
      }, 0);
      datesPassedLimit[date] = false;
      if (sumOfDay > (userDetails?.dailyLimit || 2100)) {
        datesPassedLimit[date] = true;
      }
    });
    return datesPassedLimit;
  }, [tableData, userDetails?.dailyLimit]);

  const foodsList = useMemo<(Food & { isOverLimit: boolean })[]>(
    () =>
      tableData.map((food) => {
        return { ...food, isOverLimit: datesPassedLimit[moment(food.dateTaken).format('DD-MM-YY')] };
      }) || [],
    [datesPassedLimit, tableData]
  );
  return (
    <Wrapper item xs={12}>
      <CustomTable columns={columns} data={foodsList} />
    </Wrapper>
  );
};

export default Table;

const Wrapper = styled(Grid)`
  min-height: 16.5rem;
`;
