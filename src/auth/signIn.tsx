import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import useSignIn from './hooks/useSignIn';
import { useAuthContext } from './authContext';
import { toast } from 'react-toastify';

interface Props {
  goToSignUp: () => void;
}
const SignIn: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ goToSignUp }, ref) => {
  const { mutateAsync, isError } = useSignIn();
  const { changeToken } = useAuthContext();

  useEffect(() => {
    if (isError) {
      toast.error('Incorrect User Name or Password', {
        position: 'top-right',
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [isError]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const {
      signIn: { accessToken },
    } = await mutateAsync({
      user: {
        userName: String(data.get('userName') || ''),
        password: String(data.get('password') || ''),
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
          Sign in
        </Typography>
        <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="User Name" name="userName" autoComplete="userName" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" autoComplete="current-password" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={goToSignUp}>{"Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
});
export default SignIn;
