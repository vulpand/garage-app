import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import NotFound from '../NotFound';
import { BordTable, VehicleTable, UserTable } from '../table';

const Content = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const renderContent = () => {
    switch (pathname) {
      case '/dashboard':
        return <BordTable />;
      case '/vehicles':
        return <VehicleTable />;
      case '/users':
        return <UserTable />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom width='90%'>
        {renderContent()}
      </Typography>
    </Box>
  );
};

export default Content;
