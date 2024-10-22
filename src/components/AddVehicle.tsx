import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addVehicle } from './../api';
import { VehicleCredentials } from '../types';

const AddVehicle = () => {
  const navigate = useNavigate();

  const initialValues: VehicleCredentials = {
    licensePlate: '',
    brand: '',
    model: '',
    year: 0,
    mileage: 0,
    clientId: '',
    repairHistory: []
  };

  const validationSchema = Yup.object().shape({
    licensePlate: Yup.string().required('License Plate is required'),
    brand: Yup.string().required('Brand is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.number()
      .required('Year is required')
      .min(1886, 'Year must be greater than or equal to 1886'),
    mileage: Yup.number()
      .required('Mileage is required')
      .min(0, 'Mileage must be positive'),
      clientId: Yup.string().required('Client is required'),
  });

  const handleSubmit = async (values: VehicleCredentials) => {
    const { licensePlate, brand, model, year, mileage, clientId } = values;
    
    if (!licensePlate || !brand || !model || !year || !mileage || !clientId) {
      console.error('Missing required fields');
      alert('Please fill in all required fields.');
      return;
    }

    try {
      console.log('Submitting Vehicle Data:', values);
      const response = await addVehicle(values);
      console.log('Vehicle added successfully:', response);
      navigate('/');
    } catch (error) {
      console.error('Failed to add Vehicle:', error);
      alert('Failed to add Vehicle. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Vehicle
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="licensePlate"
                label="License Plate"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.licensePlate && errors.licensePlate ? errors.licensePlate : ""}
                error={touched.licensePlate && Boolean(errors.licensePlate)}
              />
              <Field
                as={TextField}
                name="brand"
                label="Brand"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.brand && errors.brand ? errors.brand : ""}
                error={touched.brand && Boolean(errors.brand)}
              />
              <Field
                as={TextField}
                name="model"
                label="Model"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.model && errors.model ? errors.model : ""}
                error={touched.model && Boolean(errors.model)}
              />
              <Field
                as={TextField}
                name="year"
                label="Year"
                type="number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.year && errors.year ? errors.year : ""}
                error={touched.year && Boolean(errors.year)}
              />
              <Field
                as={TextField}
                name="mileage"
                label="Mileage"
                type="number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.mileage && errors.mileage ? errors.mileage : ""}
                error={touched.mileage && Boolean(errors.mileage)}
              />
              <Field
                as={TextField}
                name="clientId"
                label="Client ID"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.clientId && errors.clientId ? errors.clientId : ""}
                error={touched.clientId && Boolean(errors.clientId)}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Vehicle
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddVehicle;
