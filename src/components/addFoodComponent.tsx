import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { InputAdornment } from '@mui/material';
import DateTimePickerComponent from 'components/dateTimePicker';

import { Food } from 'interfaces';
interface Props {
  handleSubmitCB: (food: Food) => void;
  food: Partial<Food>;
  handleCaloriesChange: (calories: number) => void;
  handlePriceChange: (price: number) => void;
  handleNameChange: (name: string) => void;
  handleDateChange: (date: Date) => void;
  title: string;
}
// eslint-disable-next-line no-empty-pattern
const AddFoodComponent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  handleSubmitCB,
  food: { calorieValue = 1, dateTaken = new Date(), name = '', price = 0 },
  handleCaloriesChange,
  handleDateChange,
  handleNameChange,
  handlePriceChange,
  title,
}) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSubmitCB({
      calorieValue: Number(data.get('calories') || 1),
      dateTaken: (data.get('date') || new Date()) as Date,
      name: String(data.get('FoodName') || ''),
      price: Number(data.get('price') || 0),
      id: '',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
        backgroundColor: 'var( --body-2-color)',
      }}
      component={Paper}
      elevation={6}
      square
    >
      <Typography component="h1" color={'primary'} variant="h5">
        {title}
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
            sx={{ m: 2, width: '13.75rem' }}
            color="primary"
            required
            label="Food Name"
            name="FoodName"
            value={name}
            onChange={(e) => handleNameChange(String(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} justifyContent="center" container md={6}>
          <TextField
            sx={{ m: 2, width: '13.75rem' }}
            color="primary"
            onChange={(e) => handleCaloriesChange(Number(e.target.value))}
            error={(calorieValue || 1) < 1}
            InputProps={{
              startAdornment: <InputAdornment position="start">Kcal</InputAdornment>,
            }}
            inputProps={{
              step: '0.01',
            }}
            margin="normal"
            value={calorieValue}
            required
            name="calories"
            label="Calories"
            type="number"
          />
        </Grid>
        <Grid item xs={12} justifyContent="center" container md={6}>
          <TextField
            sx={{ m: 2, width: '13.75rem' }}
            color="primary"
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            error={(price || 0) < 0}
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
          <DateTimePickerComponent setValue={(val) => handleDateChange(val)} value={dateTaken} />
        </Grid>
        <Grid item xs={12} justifyContent="center" container md={6}>
          {children}
        </Grid>
      </Box>
    </Box>
  );
};
export default AddFoodComponent;
