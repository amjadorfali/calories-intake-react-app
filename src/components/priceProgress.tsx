import React, { useMemo } from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useAuthContext } from 'auth/authContext';

function PriceProgressWithLabel(props: CircularProgressProps & { percentage: number; animate: number; spent: number }) {
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
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" component="div" color="rgba(5,56,107,1)">{`${Math.round(props.spent) * (props.spent < 0 ? -1 : 1)}$`}</Typography>
        <Typography variant="caption" component="div" color="rgba(5,56,107,1)">
          spent this month
        </Typography>
      </Box>
    </AnimateStroke>
  );
}

const priceLimit = 1000;
export default function PriceProgress() {
  const { consumedThisMonth } = useAuthContext();

  const totalSpent = useMemo(
    () =>
      consumedThisMonth.reduce((prev, curr) => {
        prev += curr.price || 0;
        return prev;
      }, 0),
    [consumedThisMonth]
  );
  const progress = useMemo(() => (totalSpent * 100) / priceLimit, [totalSpent]);

  return (
    <PriceProgressWithLabel
      spent={totalSpent}
      animate={Number(totalSpent > priceLimit)}
      variant="determinate"
      size={'10rem'}
      percentage={totalSpent > priceLimit ? 100 : progress || 100}
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
