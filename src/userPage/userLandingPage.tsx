import { Grid, Typography } from '@mui/material';
import CalorieProgress from 'components/calorieProgress';
import Table from 'components/foodTable';
import PriceProgress from 'components/priceProgress';
import React from 'react';
import styled from 'styled-components';
import AddFood from './addFood';
import DisplayFoodsHeader from './displayFoodsHeader';
import DisplayFood from './displayFood';
import { EditFoodProvider } from './editFoodContext';
import FiltersDialog from 'components/filtersDialog';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserStatisticsList from './userStatisticsList';
const UserLandingPage: React.FC = () => {
  return (
    <EditFoodProvider>
      <Routes>
        <Route path="/" element={HomePage()} />
        <Route path="stats" element={StatsPage()} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </EditFoodProvider>
  );
};

export default UserLandingPage;

const StatsPage = () => (
  <Grid wrap="wrap" container>
    <WrapperStatisticsBlue item justifyContent={'center'} alignItems="center" container xs={12}>
      <Grid container height="50%" item xs={12}>
        <Typography sx={{ mt: '0.5rem', mb: '1.5rem' }} component={Grid} item xs={12} textAlign="center" color={'primary.contrastText'} variant="h4">
          Statistics <FiltersDialog />
        </Typography>
        <Table />
      </Grid>
    </WrapperStatisticsBlue>
    <Grid item xs={12} sx={{ mt: '-10rem' }} container justifyContent={'center'} alignItems="center">
      <PriceProgress />
    </Grid>
    <Grid item xs={12} container justifyContent={'center'} alignItems="center">
      <UserStatisticsList />
    </Grid>
  </Grid>
);

const HomePage = () => (
  <Grid wrap="wrap" container>
    <WrapperGreen wrap="wrap" item container>
      <Grid container sx={{ height: '90%' }} justifyContent={'space-between'} item>
        <Grid item xs={3} />
        <Grid item xs={2} />
        <Grid item container justifyContent={'center'} alignItems="end" xs={2}>
          <CalorieProgress />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={2} />
      </Grid>
    </WrapperGreen>
    <WrapperBlue />
    <Grid height="100%" spacing={1} justifyContent={'center'} wrap="wrap" container item xs={12}>
      <Grid item xs={9} md={6}>
        <AddFood />
      </Grid>
      <Grid height="auto" wrap="wrap" item justifyContent={'center'} container xs={9} md={6}>
        <DisplayFoodsHeader />
        <DisplayFood />
      </Grid>
    </Grid>
  </Grid>
);

const WrapperStatisticsBlue = styled(Grid)`
  width: 100%;
  position: relative;
  height: 94vh;
  align-content: flex-start;
  background: var(--header-color);
  background-size: cover;
  background-position: center;
  clip-path: polygon(50% 0%, 100% 0, 100% 100%, 50% 60%, 50% 60%, 0 100%, 0 0);
  width: 100%;
`;

const WrapperBlue = styled(Grid)`
  background: var(--header-color);
  height: 95vh;
  background-size: cover;
  background-position: center;
  clip-path: polygon(50% 40%, 100% 20%, 100% 60%, 100% 100%, 50% 100%, 0 100%, 0 20%);
  position: absolute;
  top: 0%;
  width: 100%;
  z-index: -1;
`;

const WrapperGreen = styled(Grid)`
  background: var(--body-2-color);
  position: relative;
  background-size: cover;
  background-position: center;
  height: 35vh;
  clip-path: polygon(50% 100%, 150% 0, -50% 0%);

  // var(--body-2-color) 0%, var(--header-color)
`;
