import { Snackbar, Alert } from '@mui/material';
import { useEffect } from 'react';
import { ToastCredentials } from '../types';

const Toast = ({ message, severity, duration = 3000, onClose }: ToastCredentials) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Snackbar open={!!message} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={onClose}>
      <Alert severity={severity} variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
