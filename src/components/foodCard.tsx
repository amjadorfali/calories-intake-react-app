import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Food } from 'interfaces';
import moment from 'moment';
import { CardActionArea } from '@mui/material';

interface Props extends Food {
  handleEdit: () => void;
}

const FoodCard: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ calorieValue, dateTaken, id, name, price, handleEdit }, ref) => {
  return (
    <Card
      ref={ref}
      color="var(--text-color)"
      sx={{ backgroundColor: 'var(--body-color)', color: 'var(--text-color)', overflow: 'visible', mx: 2, maxWidth: '17rem', width: 'max-content' }}
    >
      <CardActionArea onClick={handleEdit}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {calorieValue} Kcal
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>{price}$</Typography>
          <Typography variant="body2">
            {moment(dateTaken).format('DD-MM-YY - hh:mm A')}
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default FoodCard;
