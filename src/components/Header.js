import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../assets/Capture.JPG';  
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard (Upcoming Events)', path: '/dashboard' },
    { label: 'Event Details', path: '/event-details' },
    { label: 'User Profile', path: '/user-profile' },
  ];

  const handleNavigate = (path) => {
    window.location.href = path;
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="absolute"
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          padding: '0 16px',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ height: 40, cursor: 'pointer' }}
            onClick={() => window.location.href = '/'}
          />

          <IconButton edge="end" onClick={() => setDrawerOpen(true)} sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{ position: 'absolute', top: 20, right: 20, color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              sx={{ justifyContent: 'center' }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 24, align: 'center' }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
