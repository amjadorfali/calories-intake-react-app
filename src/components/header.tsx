import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Grid, Typography, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import InsightsIcon from '@mui/icons-material/Insights';
import MenuIcon from '@mui/icons-material/Menu';

import { useAuthContext } from 'auth/authContext';
import UpdateDailyLimitDialog from './updateDailyLimit';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const { changeToken, userDetails, fetchSuccessful } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [menuOpen, setMenuOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  useEffect(() => {
    if (!userDetails || (!(userDetails.accessToken && userDetails.role) && !fetchSuccessful)) {
      navigate('/', { replace: true });
    }
  }, [userDetails, navigate, fetchSuccessful]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUpdateDialog = () => {
    handleClose();
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };
  const list = () => (
    <div style={{ width: '15.5rem' }} role="presentation" onClick={() => setMenuOpen(false)} onKeyDown={() => setMenuOpen(false)}>
      <List>
        <ListItem onClick={() => navigate('/home')} button key={'Home'}>
          <ListItemIcon>
            <HomeTwoToneIcon color="primary" />
          </ListItemIcon>
          <ListItemText color="primary" primary={'Home'} />
        </ListItem>
        <ListItem onClick={() => navigate(`stats`)} button key={'Insights'}>
          <ListItemIcon>
            <InsightsIcon color="primary" />
          </ListItemIcon>
          <ListItemText color="primary" primary={'Insights'} />
        </ListItem>
        <ListItem
          onClick={() => {
            changeToken('');
            navigate('/', { replace: true });
          }}
          button
          key={'signOut'}
        >
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <ListItemText color="primary" primary={'Sign Out'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Grid container direction="row">
      <StyledNavBar position="static">
        <Toolbar>
          <Grid container item xs={11} alignItems={'center'}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={menuOpen} onClose={() => setMenuOpen(false)}>
              {list()}
            </Drawer>
            <Typography variant="h6" className={''}>
              Hello {userDetails?.userName || ''}
            </Typography>
          </Grid>

          {userDetails?.role === 'customer' && (
            <div>
              <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleOpenUpdateDialog}>Edit Calories Limit</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        {updateDialogOpen && <UpdateDailyLimitDialog open={updateDialogOpen} handleClose={handleCloseUpdateDialog} />}
      </StyledNavBar>
    </Grid>
  );
};
export default Header;

const StyledNavBar = styled(AppBar)`
  background: linear-gradient(120deg, var(--body-2-color) 0%, var(--header-color) 100%);
`;
