import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';

import styled from 'styled-components';
import useSignUp from './hooks/useSignUp';
import { useAuthContext } from './authContext';
interface Props {
  goToSignIn: () => void;
}
const SignUp: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ goToSignIn }, ref) => {
  const { mutateAsync } = useSignUp();
  const { changeToken } = useAuthContext();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const {
      signUp: { accessToken },
    } = await mutateAsync({
      createUserInput: {
        userName: String(data.get('userName') || ''),
        password: String(data.get('password') || ''),
        role: String(data.get('role') || ''),
      },
    });
    changeToken(accessToken);
  };
  return (
    <Grid ref={ref} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="User Name" name="userName" autoComplete="userName" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" autoComplete="current-password" />
          <StyledForm fullWidth>
            <InputLabel id="select-label-signUp">Role</InputLabel>
            <Select
              labelId="select-label-signUp"
              label={'Role'}
              MenuProps={MenuProps}
              variant="outlined"
              defaultValue="customer"
              name="role"
              autoComplete="role"
            >
              {['customer', 'admin'].map((text) => (
                <MenuItem key={text} value={text}>
                  <ListItemText primary={text} />
                </MenuItem>
              ))}
            </Select>
          </StyledForm>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={goToSignIn}>Already have an account? Sign In</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
});
export default SignUp;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const StyledForm = styled(FormControl)``;
