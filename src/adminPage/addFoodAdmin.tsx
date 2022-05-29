import React, { useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { Button, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import DateTimePickerComponent from 'components/dateTimePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Food } from 'interfaces';
import useGetUsers from './hooks/useGetUsers';
import { useAuthContext } from 'auth/authContext';
interface Props {
  handleSubmitForm: (food: Partial<Food> & { userId: string }) => void;
}
const AddFoodAdmin: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ handleSubmitForm }, ref) => {
  const { userDetails } = useAuthContext();
  const { data } = useGetUsers(userDetails?.accessToken || '');
  const [date, setDate] = React.useState<Date>(new Date());
  const [calories, setCalories] = useState(1);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const canSubmit = useMemo(() => price >= 0 && calories >= 1, [price, calories]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSubmitForm({
      calorieValue: Number(data.get('calories') || 1),
      dateTaken: (data.get('date') || new Date()) as Date,
      name: String(data.get('FoodName') || ''),
      price: Number(data.get('price') || 0),
      userId: String(data.get('userId') || ''),
    });
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      component={Paper}
      elevation={6}
      square
    >
      <Typography component="h1" sx={{ my: 2 }} color={'primary'} variant="h5">
        Add food to user
      </Typography>
      <Box
        component="form"
        flexWrap={'wrap'}
        display={'flex'}
        justifyContent={'center'}
        alignItems="center"
        noValidate={false}
        onSubmit={handleSubmit}
        sx={{ p: 2 }}
      >
        <FormControl component={Grid} item xs={12} justifyContent="center" container md={6} sx={{ m: 2, maxWidth: '15rem' }}>
          <InputLabel id="select-user">User</InputLabel>
          <Select defaultValue={''} required labelId="select-user" label={'User'} MenuProps={MenuProps} variant="outlined" name="userId">
            {data
              .filter((user) => user.role !== 'admin')
              .map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <ListItemText primary={user.userName} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Grid item xs={12} justifyContent="center" container md={6}>
          <TextField
            inputProps={{
              pattern: '^[a-zA-Z]+$',
            }}
            margin="normal"
            sx={{ m: 2, width: '15rem' }}
            color="primary"
            required
            label="Food"
            name="FoodName"
            value={name}
            onChange={(e) => setName(String(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} justifyContent="center" container md={6}>
          <TextField
            sx={{ m: 2, width: '15rem' }}
            color="primary"
            onChange={(e) => {
              setCalories(Number(e.target.value));
            }}
            error={calories < 1}
            InputProps={{
              startAdornment: <InputAdornment position="start">Kcal</InputAdornment>,
            }}
            inputProps={{
              step: '0.01',
            }}
            margin="normal"
            value={calories}
            required
            name="calories"
            label="Calories"
            type="number"
          />
        </Grid>
        <Grid item xs={12} justifyContent="center" container md={6}>
          <TextField
            sx={{ m: 2, width: '15rem' }}
            color="primary"
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            error={price < 0}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            inputProps={{
              step: '0.01',
            }}
            margin="normal"
            value={price}
            name="price"
            label="Price"
            type="number"
          />
        </Grid>
        <Grid item xs={12} justifyContent="center" container md={6}>
          <DateTimePickerComponent width="15rem" setValue={(val) => setDate(val)} value={date} />
        </Grid>

        <Grid item xs={6} justifyContent="center" container>
          <Button size="large" fullWidth disabled={!canSubmit} color="primary" type="submit" variant="contained">
            <AddCircleOutlineIcon />
          </Button>
        </Grid>
      </Box>
    </Box>
  );
});
export default AddFoodAdmin;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
