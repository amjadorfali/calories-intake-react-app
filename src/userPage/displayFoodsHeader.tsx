import { Grid, Typography } from '@mui/material';
import React from 'react';

const DisplayFoodsHeader: React.FC = () => {
  return (
    <Grid item xs={12} sx={{ my: 1 }}>
      <Typography textAlign={'center'} variant="h4" color="secondary.main">
        Today's intake
      </Typography>
    </Grid>
  );
};

export default DisplayFoodsHeader;
