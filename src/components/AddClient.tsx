import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ClientCredentials } from '../types';
import { addClient } from '../api';

const AddClient = () => {
  const navigate = useNavigate();

  const initialValues: ClientCredentials = {
    name: '',
    email: '',
    phoneNumber: 0,
    vehicles: []
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string(),
  });

  const handleSubmit = async (values: ClientCredentials) => {

    try {
      console.log('Submitting Client Data:', values);
      const response = await addClient(values);
      console.log('Client added successfully:', response);
      navigate('/');
    } catch (error) {
      console.error('Failed to add client:', error);
      alert('Failed to add client. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Client
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />

              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Add Client
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddClient;
