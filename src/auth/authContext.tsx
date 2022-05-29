import { Food } from 'interfaces';
import React, { useState, useContext, useMemo } from 'react';
import useGetCurrUser from './hooks/useGetCurrUser';
import lodash from 'lodash';
import moment, { Moment } from 'moment';
export interface User {
  role: 'admin' | 'customer';
  userName: string;
  accessToken: string;
  foodsList: Food[];
  dailyLimit?: number;
}

export type AuthContextType = {
  userDetails?: User;
  fetchSuccessful: boolean;
  isFilteringByDate: boolean;
  consumedToday: Food[];
  consumedThisMonth: Food[];
  filteredData: Food[];
  dateRange: { from: Moment; to: Moment };
  cancelFilter: () => void;
  changeToken: (token: string) => void;
  refetchUserData: () => void;
  handleFilterByDate: (from: Moment, to: Moment) => void;
  setDefaults: () => void;
};

const localKey = 'access-token';

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem(localKey) || '');
  const [isFilteringByDate, setIsFilteringByDate] = useState(false);
  const [dateRange, setDateRange] = useState({ from: moment(), to: moment() });
  const {
    data: { role, userName, foods, dailyLimit },
    isSuccess,
    refetch,
  } = useGetCurrUser(accessToken);

  const filteredData = useMemo(
    () =>
      isFilteringByDate
        ? foods.filter((food) => {
            const dateTaken = moment(food.dateTaken);
            return dateTaken.isSameOrAfter(dateRange.from) && dateTaken.isSameOrBefore(dateRange.to);
          })
        : foods,
    [foods, isFilteringByDate, dateRange]
  );

  const userDetails = useMemo<User>(() => {
    return { accessToken, userName, role: role as 'admin' | 'customer', foodsList: foods, dailyLimit: dailyLimit || 2100 };
  }, [accessToken, role, userName, foods, dailyLimit]);

  const [consumedToday, consumedThisMonth] = useMemo(
    () => [
      (lodash.get(userDetails, 'foodsList', []) as Food[]).filter((food) => moment(food.dateTaken).isSame(moment(), 'day')),
      (lodash.get(userDetails, 'foodsList', []) as Food[]).filter((food) => moment(food.dateTaken).isSame(moment(), 'month')),
    ],
    [userDetails]
  );

  const setDefaults = () => {
    setDateRange({ from: moment(), to: moment() });
    setIsFilteringByDate(false);
  };
  const changeToken = (token: string) => {
    localStorage.setItem(localKey, token);
    setAccessToken(token);
  };

  const refetchUserData = () => {
    refetch();
  };

  const handleFilterByDate = (from: Moment, to: Moment) => {
    setIsFilteringByDate(true);
    setDateRange({ from, to });
  };

  const cancelFilter = () => {
    setIsFilteringByDate(false);
    setDateRange({ from: moment(), to: moment() });
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        fetchSuccessful: isSuccess,
        consumedToday,
        consumedThisMonth,
        filteredData,
        changeToken,
        refetchUserData,
        cancelFilter,
        handleFilterByDate,
        isFilteringByDate,
        dateRange,
        setDefaults,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
