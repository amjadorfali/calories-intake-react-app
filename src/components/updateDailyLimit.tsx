import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputAdornment } from '@mui/material';
import { Box } from '@mui/material';
import { useAuthContext } from 'auth/authContext';
import useUpdateDailyLimit from 'userPage/hooks/useUpdateDailyLimit';

interface Props {
  handleClose: () => void;
  open: boolean;
}
const UpdateDailyLimitDialog: React.FC<Props> = ({ open, handleClose }) => {
  const { userDetails, refetchUserData } = useAuthContext();
  const { mutateAsync } = useUpdateDailyLimit(userDetails?.accessToken || '');

  const [calories, setCalories] = useState(userDetails?.dailyLimit || 2100);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await mutateAsync({ dailyLimit: Number(data.get('dailyLimit') || 2100) }, { onSuccess: () => refetchUserData() });
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color={'primary'}>Edit Daily Calorie amount</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ m: 2, width: '15rem' }}
            color="primary"
            onChange={(e) => {
              setCalories(Number(e.target.value));
            }}
            error={calories < 1}
            InputProps={{
              startAdornment: <InputAdornment position="start">Kcal</InputAdornment>,
            }}
            inputProps={{
              step: '0.01',
            }}
            margin="normal"
            value={calories}
            required
            name="dailyLimit"
            label="Daily Calories limit"
            type="number"
          />
          <DialogActions>
            <Button type="submit" disabled={calories < 1} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateDailyLimitDialog;
