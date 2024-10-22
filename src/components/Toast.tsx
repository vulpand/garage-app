import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ToastProps {
    open: boolean;
    message: string;
    severity?: 'error' | 'warning' | 'info' | 'success';
    duration?: number;
    onClose: () => void;
}

const Toast = ({
    open,
    message,
    severity = 'info',
    duration = 3000,
    onClose,
}: ToastProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
