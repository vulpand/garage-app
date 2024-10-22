import React from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

interface CommonModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: { documentName: string; file: File | null }) => void;
    validationSchema: {}
}

const BaseModal: React.FC<CommonModalProps> = ({ open, onClose, onSubmit, validationSchema }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-document-modal"
            aria-describedby="modal-to-add-new-document"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="add-document-modal" variant="h6" component="h2">
                    Add Document
                </Typography>
                <Formik
                    initialValues={{ documentName: '', file: null }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onSubmit(values);
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
                            {errors.file && touched.file && (
                                <Typography color="error">{errors.file}</Typography>
                            )}
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                Add Document
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default BaseModal; 
