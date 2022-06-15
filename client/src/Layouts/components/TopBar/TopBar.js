import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Link,
} from '@mui/material';
import { useSelector, shallowEqual } from 'react-redux';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Controls from '../../../components/Controls';

const menu = [{ name: 'Developers', href: '/developers' }];
const profile = [{ name: 'Profile', href: '/profile' }, { name: 'Logout' }];

const TopBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const reduxState = useSelector((state) => state, shallowEqual);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
              <MenuItem key={index} onClick={handleClose}>
                <Link href={prof.href} underline='none' color='inherit'>
                  {' '}
                  {prof.name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
