import React, { useState } from 'react';
import {
  Drawer as MuiDrawer,
  Toolbar,
  IconButton,
  List,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { MenuItems } from './MenuItems';
import { openDrawer } from '../../../redux/actions/navActions';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state, shallowEqual);
  const toggleDrawer = () => {
    dispatch(openDrawer(!reduxState.nav.drawerOpen));
  };
  return (
    <div>
      <Drawer variant='permanent' open={reduxState.nav.drawerOpen}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component='nav'>{MenuItems}</List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
