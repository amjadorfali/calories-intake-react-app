import React, { useMemo, useState } from 'react';

import { GridColDef, GridCellParams } from '@mui/x-data-grid';
import CustomTable from './customTable';
import moment from 'moment';
import { useAuthContext } from 'auth/authContext';
import { Button, ButtonGroup, Dialog, Grid, Typography } from '@mui/material';
import { Food } from 'interfaces';
import useGetUsers from 'adminPage/hooks/useGetUsers';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEditUserFoodContext } from 'adminPage/hooks/useEditUserFoodContext';
import AddFoodAdmin from 'adminPage/addFoodAdmin';
import useAddFoodByAdmin from './../adminPage/hooks/useAddFoodByAdmin';

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

const ModifyUserComponent: React.FC<GridCellParams> = (params) => {
  const { deleteFood, handleStartEditingFood } = useEditUserFoodContext();

  const handleUpdateFood = () => {
    const foodDetails: Food = {
      calorieValue: params.row.calorieValue,
      dateTaken: params.row.dateTaken,
      name: params.row.name,
      price: params.row.price,
      id: params.row.id,
    };
    handleStartEditingFood(params.row.userId || '', { ...foodDetails });
  };
  const handleDelete = () => {
    deleteFood(params.row.id);
  };
  return (
    <ButtonGroup>
      <Button color="primary" sx={{ mr: 1 }} onClick={handleUpdateFood} variant="contained">
        <EditIcon />
      </Button>
      <Button color="primary" sx={{ ml: 1 }} onClick={handleDelete} variant="contained">
        <DeleteIcon />
      </Button>
    </ButtonGroup>
  );
};

const getCellClass = (customClass?: string) => {
  let cellClass = 'cellClass';
  if (customClass) cellClass = cellClass.concat(` ${customClass}`);
  return cellClass;
};
const columns: GridColDef[] = [
  {
    field: 'userName',
    headerName: 'User Name',
    flex: 1.5,
    cellClassName: (params) => getCellClass('multi-line-cell'),
    headerClassName: 'headerClass',
    align: 'center',
    minWidth: 200,
    headerAlign: 'center',
  },
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
    field: 'name',
    headerName: 'Food',
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
  {
    field: 'modify',
    headerName: 'Actions',
    flex: 1.5,
    minWidth: 250,
    renderCell: ModifyUserComponent,
    headerClassName: 'headerClass',
    align: 'center',
    headerAlign: 'center',
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
  },
];

interface TableProps {}
interface Row extends Food {
  userName: string;
  userId: string;
}
const UsersTable: React.FC<TableProps> = () => {
  const { userDetails } = useAuthContext();

  const { data, refetch } = useGetUsers(userDetails?.accessToken || '');
  const { mutateAsync: addFoodAPI } = useAddFoodByAdmin(userDetails?.accessToken || '');
  const [dialogOpen, setDialogOpen] = useState(false);
  const tableData = useMemo<Row[]>(() => {
    const tableData: Row[] = [];
    data.forEach((user) => {
      tableData.push(
        ...user.foods.map((food) => {
          return { ...food, userName: user.userName, userId: user.id };
        })
      );
    });
    return tableData;
  }, [data]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleAddUserFood = async (
    userAndFood: Partial<Food> & {
      userId: string;
    }
  ) => {
    await addFoodAPI(
      {
        createFoodInput: {
          calorieValue: userAndFood.calorieValue || 1,
          dateTaken: userAndFood.dateTaken || new Date(),
          name: userAndFood.name || '',
          price: userAndFood.price || 0,
        },
        userId: userAndFood.userId || '',
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          refetch();
        },
      }
    );
  };
  return (
    <Grid direction={'row'} container height="80vh">
      <Grid sx={{ my: 3 }} item container justifyContent={'center'} alignItems="center" xs={12}>
        <Typography variant="h3" color={'primary'}>
          Add user intake
        </Typography>
        <Button onClick={() => setDialogOpen(true)} variant="contained" size="large" sx={{ py: 2, px: 5, ml: 2 }}>
          <AddCircleOutlineIcon />
        </Button>
      </Grid>
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={handleClose}>
          <AddFoodAdmin handleSubmitForm={handleAddUserFood} />
        </Dialog>
      )}
      <CustomTable columns={columns} data={tableData} />
    </Grid>
  );
};

export default UsersTable;
