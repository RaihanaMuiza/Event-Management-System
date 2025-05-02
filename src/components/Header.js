import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/Capture.JPG'; 

const Header = ({ onMenuClick }) => {
  return (
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
          sx={{  width: 150, cursor: 'pointer' }}
          onClick={() => window.location.href = '/'} 
        />

        <IconButton edge="end" onClick={onMenuClick} sx={{ color: '#fff' }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
