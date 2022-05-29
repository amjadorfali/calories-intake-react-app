import React from 'react';
import { CustomCarousel } from 'components/carousel';
import { useAuthContext } from 'auth/authContext';
import FoodCard from 'components/foodCard';
import { useEditFoodContext } from './editFoodContext';
import { Food } from 'interfaces';
import { Typography } from '@mui/material';
const DisplayFood: React.FC = () => {
  const { consumedToday } = useAuthContext();
  const { toggleEdit, changeFood } = useEditFoodContext();

  const handleEditFood = (food: Food) => {
    changeFood(food);
    toggleEdit(true);
  };
  return consumedToday.length ? (
    <CustomCarousel
      width="100%"
      items={consumedToday || []}
      renderItem={(food, key) => {
        const { calorieValue, dateTaken, id, name, price } = food;
        return (
          <FoodCard
            handleEdit={() => handleEditFood(food)}
            key={id}
            calorieValue={calorieValue}
            dateTaken={dateTaken}
            id={id}
            name={name}
            price={price || 0}
          />
        );
      }}
    />
  ) : (
    <Typography textAlign={'center'} variant="h4" color="secondary.main">
      Added food will be displayed here
    </Typography>
  );
};

export default DisplayFood;
