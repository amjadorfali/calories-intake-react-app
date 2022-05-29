import { Food } from 'interfaces';
import React, { useState, useContext, useEffect } from 'react';

export type EditFoodContextType = {
  toggleEdit: (val: boolean) => void;
  changeFood: (val: Food) => void;
  valuesEdited: Food;
  isEditing: boolean;
};

const defaultValues = { calorieValue: 1, dateTaken: new Date(), id: '', name: '' };
export const EditFoodContext = React.createContext<EditFoodContextType>({} as EditFoodContextType);
export const EditFoodProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [valuesEdited, setValuesEdited] = useState<Food>({ ...defaultValues });

  useEffect(() => {
    return () => {
      setIsEditing(false);
      setValuesEdited({ ...defaultValues });
    };
  }, []);
  const changeFood = (val: Food) => {
    setValuesEdited(val);
  };
  const toggleEdit = (val: boolean) => setIsEditing(val);
  return <EditFoodContext.Provider value={{ toggleEdit, changeFood, valuesEdited, isEditing }}>{children}</EditFoodContext.Provider>;
};

export const useEditFoodContext = () => useContext(EditFoodContext);
