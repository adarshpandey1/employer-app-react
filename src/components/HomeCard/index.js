import React from 'react';
import { Box } from '@mui/material';
import { StyledBox, StyledTypo, StyledPara } from './Styled';
import { useNavigate } from 'react-router-dom';

const HomeCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <StyledBox>
        <StyledTypo>{item.title}</StyledTypo>
        <StyledPara>{item.description}</StyledPara>
        <Box
          sx={{ display: 'flex', justifyContent: 'end', cursor: 'pointer' }}
          onClick={() => navigate(item.route)}>
          {item.icon}
        </Box>
      </StyledBox>
    </>
  );
};

export default HomeCard;
