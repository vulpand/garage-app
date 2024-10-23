import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { DeleteModalCredentioals } from '../../types';

const DeleteModal = ({
    open,
    onClose,
    onConfirm,
    itemName = 'this item',
    confirmMessage,
    confirmButtonText = 'Delete',
    cancelButtonText = 'Cancel',
}: DeleteModalCredentioals) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent dividers>
                <Typography>
                {confirmMessage ? (
                        confirmMessage
                    ) : (
                        <>Are you sure you want to delete <strong>{itemName}</strong> ?</>
                    )}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="info">
                    {cancelButtonText}
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
