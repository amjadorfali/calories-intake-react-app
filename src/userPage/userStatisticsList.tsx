import React, { useMemo } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useAuthContext } from 'auth/authContext';
import moment from 'moment';
import lodash from 'lodash';
import { Food } from 'interfaces';
type Day = { foodsList: Food[]; ate: number };
type Days = { [day: string]: Day };
type IntakeObject = { [month: string]: { [day: string]: Day | number } };
export default function UserStatisticsList() {
  const { userDetails } = useAuthContext();

  const intakePerMonthAndDay = useMemo<IntakeObject>(() => {
    return lodash
      .sortBy(userDetails?.foodsList || [], ['dateTaken'])
      .reverse()
      .reduce((prev, curr) => {
        const date = moment(curr.dateTaken || new Date());
        const month = date.format('MMM / YYYY');
        const day = date.format('ddd - Do');
        if (!lodash.get(prev, `${month}.${day}`) || !prev[month]) {
          prev[month] = { ...prev[month], [day]: { foodsList: [], ate: 0 } };
        }
        const currDay = prev[month][day] as Day;
        // debugger;

        currDay.foodsList.push(curr);
        currDay.ate = currDay.ate + curr.calorieValue;
        prev[month].totalSpent = (curr.price || 0) + Number(prev[month].totalSpent || 0);
        return prev;
      }, {} as IntakeObject);
  }, [userDetails?.foodsList]);

  // console.log('intakePerMonthAndDay');
  return (
    <List
      sx={{ width: '100%', overflow: 'scroll', maxHeight: '24rem', minHeight: '10rem', maxWidth: 360, bgcolor: 'var(--header-color)' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          sx={{ bgcolor: 'var(--body-2-color)', fontWeight: '900', color: 'var(--text-color)' }}
          component="div"
          id="nested-list-subheader-user"
        >
          Monthly & Daily Breakdown
          {lodash.isEmpty(intakePerMonthAndDay) && (
            <>
              <br /> Add some food for this list to grow!
            </>
          )}
        </ListSubheader>
      }
    >
      {Object.entries(intakePerMonthAndDay).map(([month, days]) => (
        <NestedMonths dailyLimit={userDetails?.dailyLimit || 2100} key={month} month={month} days={days as Days} />
      ))}
    </List>
  );
}

interface MonthsListProps {
  month: string;
  dailyLimit: number;
  days: Days;
}
const NestedMonths: React.FC<MonthsListProps> = ({ days, month, dailyLimit }) => {
  const [monthOpen, setMonthOpen] = React.useState(false);
  const handleClick = () => {
    setMonthOpen(!monthOpen);
  };
  const { totalSpent, ...restOfDays } = days;
  const displayTotalSpent = Math.round(totalSpent as unknown as number);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CalendarMonthIcon color="secondary" />
        </ListItemIcon>
        <ListItemText
          sx={{ color: 'var(--text-color)' }}
          primary={<span style={{ fontWeight: displayTotalSpent > 1000 ? '900' : '600' }}>{month}</span>}
        />
        <ListItemText
          sx={{ color: 'var(--text-color)' }}
          primary={<span style={{ fontWeight: displayTotalSpent > 1000 ? '900' : '400' }}>${displayTotalSpent}/$1000</span>}
        />

        {monthOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={monthOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(restOfDays).map(([day, { ate, foodsList }]) => (
            <NestedDays dailyLimit={dailyLimit} key={day} day={day} foodsList={foodsList} ate={ate} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

interface DaysListProps {
  day: string;
  foodsList: Food[];
  ate: number;
  dailyLimit: number;
}
const NestedDays: React.FC<DaysListProps> = ({ day, foodsList, ate, dailyLimit }) => {
  const [dayOpen, setDayOpen] = React.useState(false);
  const handleClick = () => {
    setDayOpen(!dayOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: 4 }}>
        <ListItemText primary={<span style={{ fontWeight: ate > dailyLimit ? '900' : '400' }}>{day}</span>} sx={{ color: 'var(--text-color)' }} />
        <ListItemText
          sx={{ color: 'var(--text-color)' }}
          primary={<span style={{ fontWeight: ate > dailyLimit ? '900' : '400' }}>{Math.round(ate)}</span>}
        />
        <ListItemText
          sx={{ color: 'var(--text-color)' }}
          primary={<span style={{ fontWeight: ate > dailyLimit ? '900' : '400' }}>{dailyLimit}Kcal</span>}
        />
        {dayOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={dayOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {foodsList.map((food) => (
            <ListItemButton key={food.id} sx={{ pl: 6 }}>
              <ListItemIcon>
                <EmojiFoodBeverageIcon color="secondary" />
              </ListItemIcon>

              <ListItemText sx={{ color: 'var(--text-color)' }} primary={food.name} />
              <ListItemText sx={{ color: 'var(--text-color)' }} primary={`$${food.price || 0}`} />
              <ListItemText sx={{ color: 'var(--text-color)' }} primary={`${food.calorieValue || 1}Kcal`} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
