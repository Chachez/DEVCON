import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Navigate } from 'react-router-dom';

import Controls from '../../../components/Controls';
import { logout } from '../../../redux/actions/authActions';

const menu = [{ name: 'Developers', href: '/developers' }];
const profile = [{ name: 'Profile', href: '/profile' }, { name: 'Logout' }];

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const reduxState = useSelector((state) => state, shallowEqual);
  const [state, setState] = useState({
    logoutConfirmationModal: false,
  });
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openLogoutModal = () => {
    setState({ ...state, logoutConfirmationModal: true });
  };

  const closeLogoutModal = () => {
    setState({ ...state, logoutConfirmationModal: false });
  };

  const logoutUser = () => {
    dispatch(logout());
    closeLogoutModal();
    <Navigate to='/login' />;
  };

  return (
    <>
      <Dialog
        open={state.logoutConfirmationModal}
        onClose={closeLogoutModal}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          <Controls.Titles
            variant='h6'
            component='body2'
            label=' Please confirm your action'
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You are about to get signed out and all your unsaved work will be
            lost. Do you wish to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Controls.ButtonInput
            variant='outlined'
            onClick={closeLogoutModal}
            label='Stay logged In'
          />
          <Controls.ButtonInput
            onClick={logoutUser}
            label='Logout'
            variant='contained'
          />
        </DialogActions>
      </Dialog>
      <AppBar position='absolute' open={reduxState.nav.drawerOpen}>
        <Toolbar>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Github Connect
          </Typography>

          {menu.map((menu, index) => (
            <Typography
              key={index}
              variant='h6'
              component='div'
              sx={{ flexGrow: 1 }}
            >
              {menu.name}
            </Typography>
          ))}
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
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
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {profile.map((prof, index) => (
                <MenuItem
                  key={index}
                  onClick={(e) => {
                    handleClose(e);
                    console.log(index);
                    index === 1 && openLogoutModal(e);
                  }}
                >
                  <Link href={prof.href} underline='none' color='inherit'>
                    {prof.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
