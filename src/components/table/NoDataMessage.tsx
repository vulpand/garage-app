import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

const NoDataMessage: React.FC = () => {
  return (
    <StyledBox>
      <Typography variant="body1" color="textSecondary">
        No data found
      </Typography>
    </StyledBox>
  );
};

export default NoDataMessage;
