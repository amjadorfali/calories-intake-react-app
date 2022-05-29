import React, { useState, useContext, useMemo, useEffect } from 'react';
import { useAuthContext } from 'auth/authContext';
import { Food } from 'interfaces';
import useDeleteFood from 'userPage/hooks/useDeleteFood';
import useEditFood from 'userPage/hooks/useEditFood';
import useGetUsers from './useGetUsers';
import { Dialog } from '@mui/material';
import ModifyFood from 'adminPage/modifyFood';

export type EditUserFoodContextType = {
  deleteFood: (foodId: string) => void;
  handleStartEditingFood: (userId: string, foodDetails: Food) => void;
};

export const EditUserFoodContext = React.createContext<EditUserFoodContextType>({} as EditUserFoodContextType);
export const EditUserFoodProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [foodDetails, setFoodDetails] = useState<Partial<Food>>({});
  const [operationType, setOperationType] = useState<'' | 'edit' | 'add'>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { userDetails } = useAuthContext();
  const accessToken = useMemo(() => userDetails?.accessToken || '', [userDetails?.accessToken]);
  const { refetch } = useGetUsers(accessToken);
  const { mutateAsync: deleteFoodASync } = useDeleteFood(accessToken);
  const { mutateAsync: editFoodAsync } = useEditFood(accessToken);

  useEffect(() => {
    return () => {
      setOperationType('');
      setFoodDetails({});
      setDialogOpen(false);
    };
  }, []);

  const handleStartEditingFood = (userId: string, foodDetails: Food) => {
    setFoodDetails(foodDetails);
    setOperationType('edit');
    setDialogOpen(true);
  };
  const deleteFood = async (foodId: string) => {
    await deleteFoodASync({ id: foodId }, { onSuccess: () => refetch() });
  };

  const handleClose = () => {
    setDialogOpen(false);
    setOperationType('');
    setFoodDetails({});
  };

  const handleSubmit = (food: Food) => {
    const { calorieValue, dateTaken, id, name, price } = food;
    editFoodAsync(
      {
        updateFoodInput: {
          foodId: id,
          calorieValue,
          dateTaken,
          name,
          price: price || 0,
        },
      },
      {
        onSuccess: () => {
          handleClose();
          refetch();
        },
      }
    );
  };

  return (
    <EditUserFoodContext.Provider value={{ deleteFood, handleStartEditingFood }}>
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={handleClose}>
          <ModifyFood handleSubmitForm={handleSubmit} food={foodDetails} operationType={operationType} />
        </Dialog>
      )}
      {children}
    </EditUserFoodContext.Provider>
  );
};

export const useEditUserFoodContext = () => useContext(EditUserFoodContext);
