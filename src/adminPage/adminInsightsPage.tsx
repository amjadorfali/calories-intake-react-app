import { Grid, Paper, Typography } from '@mui/material';
import { useAuthContext } from 'auth/authContext';
import { Food } from 'interfaces';
import moment from 'moment';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import AdminStatsList, { UserDisplay } from './adminStatsList';
import useGetUsers from './hooks/useGetUsers';

const today = () => moment().format('DD/MMM');
const past6Days = () => moment().subtract('6', 'days').format('DD/MMM');
const past7Days = () => moment().subtract('7', 'days').format('DD/MMM');
const past14Days = () => moment().subtract('13', 'days').format('DD/MMM');

const AdminInsightsPage: React.FC = () => {
  const { userDetails } = useAuthContext();
  const { data } = useGetUsers(userDetails?.accessToken || '');
  const [entriesLast7Days, entriesLastLast7Days] = useMemo<[Food[], Food[]]>(() => {
    const today = moment();
    const last2Weeks = moment().subtract('13', 'days');
    const lastWeek = moment().subtract('7', 'days');
    const entriesLastTwoWeeks = data.reduce<Food[]>((prev, curr) => {
      const lastTwoWeeksEntries = curr.foods.filter((food) => {
        const dateTaken = moment(food.dateTaken);
        return dateTaken.isSameOrAfter(last2Weeks, 'day') || (dateTaken.isSameOrBefore(today, 'day') && !dateTaken.isBefore(last2Weeks, 'day'));
      });
      prev.push(...lastTwoWeeksEntries);
      return prev;
    }, []);
    const entriesLast7Days: Food[] = [];
    const entriesLastLast7Days: Food[] = [];
    entriesLastTwoWeeks.forEach((food) => {
      const dateTaken = moment(food.dateTaken);
      if (dateTaken.isAfter(lastWeek, 'day')) {
        entriesLast7Days.push(food);
      } else {
        entriesLastLast7Days.push(food);
      }
    });
    return [entriesLast7Days, entriesLastLast7Days];
  }, [data]);

  const usersLast7DaysActivity = useMemo<UserDisplay[]>(() => {
    const today = moment();
    const lastWeek = moment().subtract('6', 'days');
    return data
      .map((user) => {
        const last7DaysIntake = user.foods.filter((food) => {
          const dateTaken = moment(food.dateTaken);
          return dateTaken.isSameOrAfter(lastWeek, 'day') || (dateTaken.isSameOrBefore(today, 'day') && !dateTaken.isBefore(lastWeek, 'day'));
        });
        return { ...user, foodsList: [...last7DaysIntake] };
      })
      .filter((user) => user.role !== 'admin');
  }, [data]);

  return (
    <Grid sx={{ mt: 5 }} container item xs={12} justifyContent={'center'} alignItems="center">
      <Grid container item xs={12} justifyContent={'center'} alignItems="center">
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography textAlign="center" variant="h2" color={'primary'}>
            Metrics
          </Typography>
        </Grid>
        <Grid item xs={1} />
        <StyledPaperGrid item xs={4} container component={Paper} sx={{ py: 4 }} elevation={12} justifyContent={'center'}>
          <Typography component={Grid} sx={{ mb: 4, fontWeight: '900' }} xs={12} textAlign="center" color={'var(--text-color)'} item variant="h5">
            {past14Days()} to {past7Days()}
          </Typography>
          <Counter id={'2'} count={entriesLastLast7Days.length} />
        </StyledPaperGrid>
        <Grid item xs={2} />
        <StyledPaperGrid item container component={Paper} sx={{ py: 4 }} elevation={12} justifyContent={'center'} xs={4}>
          <Typography component={Grid} sx={{ mb: 4, fontWeight: '900' }} xs={12} textAlign="center" item variant="h5" color={'var(--text-color)'}>
            {past6Days()} to {today()}
          </Typography>
          <Counter id={'1'} count={entriesLast7Days.length} />
        </StyledPaperGrid>
        <Grid item xs={1} />
      </Grid>

      <Grid sx={{ margin: '8rem 0 4rem 0' }} container item xs={12} justifyContent="center" alignItems="center">
        <AdminStatsList from={past6Days()} to={today()} users={usersLast7DaysActivity} />
      </Grid>
    </Grid>
  );
};

export default AdminInsightsPage;

const StyledPaperGrid = styled(({ ...props }) => <Grid {...props} />)`
  background-color: var(--body-2-color);
`;
const Counter = styled.span<{ count: number; id: string }>`
  @property --num-${({ id }) => id} {
    syntax: '<integer>';
    initial-value: 0;
    inherits: false;
  }
  font-size: 2rem;
  color : var(--text-color);
  font-weight : 900;
  animation: animate-${({ id }) => id} 2s 1 alternate ease-in-out forwards;
  counter-reset: num var(--num-${({ id }) => id});
  ::after {
    content: counter(num);
  }

  @keyframes animate-${({ id }) => id} {
    from {
      --num-${({ id }) => id}: 0;
    }
    to {
      --num-${({ id }) => id}: ${({ count }) => (count ? count : 0)};
    }
  }
`;
