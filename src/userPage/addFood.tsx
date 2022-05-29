import React, { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import Typography from '@mui/material/Typography';
import { ButtonGroup, InputAdornment } from '@mui/material';
import DateTimePickerComponent from 'components/dateTimePicker';
import useAddFood from './hooks/useAddFood';
import { useAuthContext } from 'auth/authContext';
import { useEditFoodContext } from './editFoodContext';
import useDeleteFood from './hooks/useDeleteFood';
import useEditFood from './hooks/useEditFood';
import { Food } from 'interfaces';
import AddFoodComponent from 'components/addFoodComponent';
interface Props {}
// eslint-disable-next-line no-empty-pattern
const AddFood: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({}, ref) => {
  const { userDetails, refetchUserData } = useAuthContext();
  const { mutateAsync: addFoodAPI } = useAddFood(userDetails?.accessToken || '');
  const { mutateAsync: deleteFoodAPI } = useDeleteFood(userDetails?.accessToken || '');
  const { mutateAsync: editFoodAPI } = useEditFood(userDetails?.accessToken || '');
  const { toggleEdit, isEditing, valuesEdited, changeFood } = useEditFoodContext();

  const [date, setDate] = React.useState<Date>(new Date());
  const [calories, setCalories] = useState(1);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const canSubmit = useMemo(() => price >= 0 && calories >= 1, [price, calories]);

  const food = useMemo<Partial<Food>>(() => {
    return {
      name,
      price,
      calorieValue: calories,
      dateTaken: date,
    };
  }, [calories, date, price, name]);
  useEffect(() => {
    if (isEditing) {
      const { calorieValue, dateTaken, price, name } = valuesEdited;
      setName(name);
      setPrice(price || 0);
      setCalories(calorieValue);
      setDate(dateTaken);
    }
  }, [isEditing, valuesEdited]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await addFoodAPI(
      {
        createFoodInput: {
          calorieValue: Number(data.get('calories') || 1),
          dateTaken: (data.get('date') || new Date()) as Date,
          name: String(data.get('FoodName') || ''),
          price: Number(data.get('price') || 0),
        },
      },
      {
        onSuccess: () => {
          refetchUserData();

          const defaults: Food = { calorieValue: 1, dateTaken: new Date(), id: '', name: '', price: 0 };
          const { calorieValue, dateTaken, price, name } = defaults;
          setName(name);
          setPrice(price || 0);
          setCalories(calorieValue);
          setDate(dateTaken);
        },
      }
    );
  };

  const handleCancelEdit = () => {
    const defaults: Food = { calorieValue: 1, dateTaken: new Date(), id: '', name: '', price: 0 };
    toggleEdit(false);
    changeFood({ ...defaults });
    const { calorieValue, dateTaken, price, name } = defaults;
    setName(name);
    setPrice(price || 0);
    setCalories(calorieValue);
    setDate(dateTaken);
  };
  const handleDelete = async () => {
    await deleteFoodAPI(
      { id: valuesEdited.id },
      {
        onSuccess: () => {
          refetchUserData();
          handleCancelEdit();
        },
      }
    );
  };
  const handleUpdateFood = async () => {
    await editFoodAPI(
      {
        updateFoodInput: {
          price,
          dateTaken: date,
          calorieValue: calories,
          name,
          foodId: valuesEdited.id,
        },
      },
      {
        onSuccess: () => {
          refetchUserData();
          handleCancelEdit();
        },
      }
    );
  };

  return (
    <AddFoodComponent
      food={food}
      title={isEditing ? 'Update food' : 'Add some calories'}
      handleCaloriesChange={(cal) => setCalories(cal)}
      handleDateChange={(date) => setDate(date)}
      handleNameChange={(name) => setName(name)}
      handleCaloriesChange={(cal) => setCalories(cal)}
      handleSubmitCB={() => {}}
    >
      {isEditing ? (
        <ButtonGroup>
          <Button disabled={!canSubmit} color="primary" onClick={handleCancelEdit} variant="contained">
            <CancelIcon />
          </Button>
          <Button disabled={!canSubmit} color="primary" onClick={handleUpdateFood} variant="contained">
            <EditIcon />
          </Button>
          <Button disabled={!canSubmit} color="primary" onClick={handleDelete} variant="contained">
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      ) : (
        <Button disabled={!canSubmit} color="primary" type="submit" variant="contained">
          <AddCircleOutlineIcon />
        </Button>
      )}
    </AddFoodComponent>
  );
});
export default AddFood;
