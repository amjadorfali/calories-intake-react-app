import React, { useMemo } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

import { Food } from 'interfaces';
import lodash from 'lodash';
export interface UserDisplay {
  userName: string;
  foodsList: Food[];
}

interface Props {
  users: UserDisplay[];
  from: string;
  to: string;
}
interface UserAverage extends UserDisplay {
  totalCalories: number;
}
const AdminStatsList: React.FC<Props> = ({ users, from, to }) => {
  const usersList = useMemo<UserAverage[]>(() => {
    return users.map((user) => {
      let totalCalories = 0;
      user.foodsList.forEach((food) => {
        totalCalories += food.calorieValue;
      });
      return { ...user, totalCalories };
    });
  }, [users]);
  return (
    <List
      sx={{ width: '100%', overflow: 'scroll', maxHeight: '24rem', minHeight: '10rem', maxWidth: '40rem', bgcolor: 'var(--header-color)' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          sx={{ bgcolor: 'var(--body-2-color)', fontWeight: '900', color: 'var(--text-color)' }}
          component="div"
          id="nested-list-subheader"
        >
          Users average from {from} to {to}
          {lodash.isEmpty(usersList) && (
            <>
              <br /> No one has touched this app yet
            </>
          )}
        </ListSubheader>
      }
    >
      <ListItemButton
        key={'header'}
        sx={{ pl: 6, textAlign: 'center', backgroundColor: 'var(--body-2-color)', ':hover': { backgroundColor: 'var(--body-2-color)' } }}
      >
        <ListItemIcon></ListItemIcon>
        <ListItemText sx={{ color: 'var(--text-color)', maxWidth: '8rem' }} primary={'User Name'} />
        <ListItemText sx={{ color: 'var(--text-color)' }} primary={'% Kcal'} />
      </ListItemButton>

      {usersList.map((user) => (
        <ListItemButton key={user.userName} sx={{ pl: 6, textAlign: 'center' }}>
          <ListItemIcon>
            <EmojiFoodBeverageIcon color="secondary" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'var(--text-color)', maxWidth: '8rem' }} primary={user.userName} />
          <ListItemText sx={{ color: 'var(--text-color)' }} primary={Math.round(user.totalCalories / 7)} />
        </ListItemButton>
      ))}
    </List>
  );
};
export default AdminStatsList;
