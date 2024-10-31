import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Paper, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addVehicle, getAllClients } from './../api';
import { ClientCredentials, VehicleCredentials } from '../types';
import { useState, useEffect } from 'react';
import { useToast } from './context/ToastContext';

const AddVehicle = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [clients, setClients] = useState<ClientCredentials[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientData = await getAllClients();
        setClients(clientData);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };
    fetchClients();
  }, []);

  const initialValues: VehicleCredentials = {
    licensePlate: '',
    brand: '',
    model: '',
    year: 0,
    mileage: 0,
    client: {id: '', name: ''},
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
    client: Yup.string().required('Client is required'),
  });

  const handleSubmit = async (values: VehicleCredentials) => {
    try {
      const response = await addVehicle(values);
      console.log('Vehicle added', response);
      showToast('Vehicle added successfully', 'success');
      navigate('/vehicles');
    } catch (error) {
      showToast('Failed to add vehicle', 'error');
      console.log('Failed to add Vehicle:', error);
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
          {({ handleChange, handleBlur, touched, errors, setFieldValue, values }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
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
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mb: 2
                }}
              >
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
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mb: 2
                }}
              >
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
              </Box>

              {/* Client ID - Full Width */}
              <Box sx={{ mb: 2 }}>
                <Autocomplete
                  options={clients}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  onChange={(e, value) => setFieldValue('client', value?._id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Client"
                      margin="normal"
                      // helperText={touched.client && errors.client ? errors.client : ""}
                      error={touched.client && Boolean(errors.client)}
                    />
                  )}
                />
              </Box>

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
