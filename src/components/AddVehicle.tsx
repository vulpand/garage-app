import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddNewVehicle = () => {
  const navigate = useNavigate();

  const initialValues = {
    licensePlate: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    client: '',
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
    client: Yup.string().required('Client is required'),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
    navigate('/')
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
              name="client"
              label="Client ID"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.client && errors.client ? errors.client : ""}
              error={touched.client && Boolean(errors.client)}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Add vehicle
            </Button>
          </Form>
        )}
      </Formik>
      </Paper>
    </Box>
  );
};

export default AddNewVehicle;
