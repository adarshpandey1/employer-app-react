import React from 'react';
import { AppBar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar sx={{ width: '100%', height: '70px', backgroundColor: '#1976d2' }}>
        <Typography
          fontSize={20}
          color="white"
          fontWeight="bold"
          width={80}
          p={1}
          cursor="pointer"
          onClick={() => navigate('/')}>
          Spaising <span style={{ color: 'pink' }}>Technologies</span>
        </Typography>
      </AppBar>
    </>
  );
};

export default Header;
