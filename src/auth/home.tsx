import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid';

import SignUp from './signUp';
import SignIn from './signIn';
import { useAuthContext } from './authContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [justify, setJustify] = useState('flex-end');
  const { userDetails, setDefaults } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails && userDetails.accessToken && userDetails.userName) {
      navigate('home');
    }
  }, [userDetails, navigate]);

  useEffect(() => {
    setDefaults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid
      sx={{
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
      container
      component="main"
      justifyContent={justify}
    >
      <CssBaseline />
      <Slide
        onExited={() => {
          setIsSignUp(true);
          setJustify('flex-start');
        }}
        direction="left"
        in={isSignIn}
        timeout={{ enter: 600, exit: 500, appear: 700 }}
        mountOnEnter
        unmountOnExit
      >
        <SignIn goToSignUp={() => setIsSignIn(false)} />
      </Slide>
      <Slide
        onExited={() => {
          setIsSignIn(true);
          setJustify('flex-end');
        }}
        direction="right"
        in={isSignUp}
        timeout={{ enter: 600, exit: 500, appear: 700 }}
        mountOnEnter
        unmountOnExit
      >
        <SignUp goToSignIn={() => setIsSignUp(false)} />
      </Slide>
    </Grid>
  );
};
export default Home;
