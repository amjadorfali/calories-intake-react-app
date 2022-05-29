import React from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './auth/home';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { AuthProvider, AuthContext } from 'auth/authContext';
import UserLandingPage from 'userPage/userLandingPage';

import AdminLandingPage from 'adminPage/adminLandingPage';
import Header from 'components/header';

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ userDetails }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={1000}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route
                  path="home/*"
                  element={
                    <div>
                      <Header />
                      {!!(userDetails && userDetails.role) && (userDetails.role === 'admin' ? <AdminLandingPage /> : <UserLandingPage />)}
                    </div>
                  }
                />
                <Route path="*" element={<Navigate to={userDetails && userDetails.accessToken ? '/home' : '/'} replace />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
