import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DateTimePickerComponent: React.FC<{ setValue: (date: Date) => void; value: Date; width?: string }> = ({
  setValue,
  value,
  width = '13.75rem',
}) => {
  const handleChange = (newValue: Date | null) => {
    setValue(newValue || new Date());
  };

  return (
    <DateTimePicker
      label="What time?"
      value={value}
      onChange={handleChange}
      disableMaskedInput
      disableFuture
      renderInput={(params) => <TextField name="date" {...params} sx={{ m: 2, width }} />}
    />
  );
};

export default DateTimePickerComponent;
