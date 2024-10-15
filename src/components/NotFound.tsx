import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Box>
        <Typography variant="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you are looking for might have been removed or is temporarily unavailable.
        </Typography>
        <Button variant="contained" color="primary" onClick={goHome}>
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
