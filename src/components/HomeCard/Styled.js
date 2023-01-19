import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const StyledBox = styled(Box)`
  border-radius: 5px;
  box-shadow: 0px 30px 40px -20px var(--grayishBlue);
  padding: 30px;
  margin: 20px;
  background-color: chocolate;
  border-top: 3px solid var(--cyan);
`;

export const StyledTypo = styled(Typography)`
  font-size: 20px;
  color: white;
  font-family: ui-sarif;
`;

export const StyledPara = styled(Typography)`
  font-size: 18px;
  margin-top: 10px;
`;
