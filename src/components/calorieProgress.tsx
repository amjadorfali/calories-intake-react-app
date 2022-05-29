import React, { useMemo } from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useAuthContext } from 'auth/authContext';
import lodash from 'lodash';

function CircularProgressWithLabel(props: CircularProgressProps & { percentage: number; animate: number; calories_left: number; limit: number }) {
  return (
    <AnimateStroke animate={Number(props.animate)} sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress value={props.percentage} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mr: 0.5, fontWeight: 600 }} color="rgba(5,56,107,1)">{`${
          Math.round(props.calories_left) * (props.calories_left < 0 ? -1 : 1)
        }`}</Typography>
        <Typography variant="caption" color="rgba(5,56,107,1)">
          Kcal {props.calories_left < 0 ? '+' : 'left'}
          <br />
          of {props.limit || 2100}
        </Typography>
      </Box>
    </AnimateStroke>
  );
}

export default function CalorieProgress() {
  const { userDetails, consumedToday } = useAuthContext();

  const consumedAmount = useMemo(
    () =>
      consumedToday.reduce((prev, curr) => {
        prev += curr.calorieValue;
        return prev;
      }, 0),
    [consumedToday]
  );
  const limit = useMemo(() => Number(lodash.get(userDetails, 'dailyLimit', 2100)), [userDetails]);
  const progress = useMemo(() => (consumedAmount * 100) / limit, [limit, consumedAmount]);
  const caloriesLeftToday = useMemo(() => limit - consumedAmount, [consumedAmount, limit]);
  return (
    <CircularProgressWithLabel
      calories_left={caloriesLeftToday}
      animate={Number(caloriesLeftToday < 0)}
      variant="determinate"
      size={'12rem'}
      percentage={consumedAmount > limit ? 100 : progress || 100}
      limit={limit}
    />
  );
}

const AnimateStroke = styled(Box)<{ animate?: number }>`
  margin-bottom: 2rem;

  svg {
    circle {
      stroke: rgba(5, 56, 107, 1);
      ${({ animate }) =>
        animate
          ? `
      animation: stroke 0.5s alternate infinite;
      stroke: #d50000;
      `
          : ''}
    }
  }

  @keyframes stroke {
    from {
      stroke-width: 3.5px;
    }
    to {
      stroke-width: 1.5px;
    }
  }
`;
