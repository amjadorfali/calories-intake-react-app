import * as React from 'react';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers';

interface Props {
  setValue: (date: Date) => void;
  value: Date;
  maxDate?: Date;
  minDate?: Date;
  label: string;
}
const DatePickerComponent: React.FC<Props> = ({ setValue, value, maxDate, minDate, label }) => {
  const handleChange = (newValue: Date | null) => {
    setValue(newValue || new Date());
  };
  return (
    <DatePicker
      onChange={handleChange}
      disableMaskedInput
      desktopModeMediaQuery="@media (min-width: 380px)"
      disableFuture
      label={label}
      value={moment(value)}
      //@ts-ignore
      maxDate={maxDate ? moment(maxDate) : undefined}
      //@ts-ignore
      minDate={minDate ? moment(minDate) : undefined}
      renderInput={(params) => <TextField name={label} {...params} sx={{ m: 2 }} />}
    />
  );
};

export default DatePickerComponent;
