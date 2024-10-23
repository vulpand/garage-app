import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AddDocumentModalCredentioals } from '../../types';

const AddDocumentSchema = Yup.object().shape({
    documentName: Yup.string().required('Document name is required'),
    file: Yup.mixed().required('A file is required'),
});

const AddDocumentModal = ({ open, onClose, onSubmit }: AddDocumentModalCredentioals) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Document</DialogTitle>
            <DialogContent dividers>
                <Formik
                    initialValues={{ documentName: '', file: null }}
                    validationSchema={AddDocumentSchema}
                    onSubmit={(values, { resetForm }) => {
                        onSubmit(values);
                        resetForm();
                        onClose();
                    }}
                >
                    {({ setFieldValue, errors, touched }) => (
                        <Form>
                            <Field
                                as={TextField}
                                name="documentName"
                                label="Document Name"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                error={Boolean(touched.documentName && errors.documentName)}
                                helperText={touched.documentName && errors.documentName}
                            />
                            <input
                                type="file"
                                onChange={(event) => {
                                    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                    setFieldValue('file', file);
                                }}
                            />
                            {touched.file && errors.file && (
                                <Typography color="error" variant="body2">
                                    {errors.file}
                                </Typography>
                            )}
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button type="submit" form="formik-form" variant="contained" color="primary">
                    Add Document
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDocumentModal;
