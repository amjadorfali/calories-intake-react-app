import React, { useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { Button, InputAdornment } from '@mui/material';
import DateTimePickerComponent from 'components/dateTimePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Food } from 'interfaces';
interface Props {
  food: Partial<Food>;
  operationType: '' | 'edit' | 'add';
  handleSubmitForm: (food: Food) => void;
}
const ModifyFood: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ food, operationType, handleSubmitForm }, ref) => {
  const [date, setDate] = React.useState<Date>(food.dateTaken || new Date());
  const [calories, setCalories] = useState(food.calorieValue || 1);
  const [price, setPrice] = useState(food.price || 0);
  const [name, setName] = useState(food.name || '');
  const canSubmit = useMemo(() => price >= 0 && calories >= 1, [price, calories]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSubmitForm({
      id: food.id || '',
      calorieValue: Number(data.get('calories') || 1),
      dateTaken: (data.get('date') || new Date()) as Date,
      name: String(data.get('FoodName') || ''),
      price: Number(data.get('price') || 0),
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
        {!!operationType && (operationType === 'edit' ? 'Update food' : 'Add some calories')}
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
        <Grid item xs={12} justifyContent="center" container md={6}>
          <TextField
            inputProps={{
              pattern: '^[a-zA-Z]+$',
            }}
            margin="normal"
            sx={{ m: 2, width: '15rem' }}
            color="primary"
            required
            label="Food Name"
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
            {operationType && (operationType === 'edit' ? <EditIcon /> : <AddCircleOutlineIcon />)}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
});
export default ModifyFood;
