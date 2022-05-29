import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { useAuthContext } from 'auth/authContext';
import FilterListIcon from '@mui/icons-material/FilterList';
import DatePickerComponent from './datePicker';
import moment from 'moment';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {}
const FiltersDialog: React.FC<Props> = () => {
  const { handleFilterByDate, isFilteringByDate, cancelFilter } = useAuthContext();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [dateFrom, setDateFrom] = useState(moment().toDate());
  const [dateTo, setDateTo] = useState(moment().toDate());
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFilterByDate(moment(dateFrom).startOf('D'), moment(dateTo).endOf('D'));
    handleClose();
  };

  const handleCancelFilter = () => {
    cancelFilter();
    setDateTo(moment().toDate());
    setDateFrom(moment().toDate());
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color={'secondary'}>
        <FilterListIcon color="primary" />
      </Button>
      {isFilteringByDate && (
        <Button sx={{ ml: 2 }} onClick={handleCancelFilter} variant="contained" color={'secondary'}>
          <CancelIcon color="primary" />
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary" textAlign={'center'}>
          Filter by Date
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display={'flex'}
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container justifyContent={'center'} item xs={12} lg={6}>
              <DatePickerComponent label="From" setValue={(from) => setDateFrom(from)} value={dateFrom} maxDate={dateTo} />
            </Grid>
            <Grid container justifyContent={'center'} item xs={12} lg={6}>
              <DatePickerComponent label="To" setValue={(to) => setDateTo(to)} value={dateTo} minDate={dateFrom} />
            </Grid>

            <DialogActions>
              <Button size="large" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Filter
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default FiltersDialog;
