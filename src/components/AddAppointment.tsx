import { Box, TextField, Button, MenuItem, Autocomplete } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AppointmentCredentials, ClientCredentials } from '../types';
import { addAppointment, getAllClients } from '../api';
import { useEffect, useState } from 'react';

const AddAppointment = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientCredentials[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientCredentials | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      const fetchedClients = await getAllClients();
      setClients(fetchedClients);
    };
    fetchClients();
  }, []);

  const handleClientChange = (client: ClientCredentials | null) => {
    setSelectedClient(client);
  };

  const initialValues = {
    clientId: '',
    vehicleId: '',
    date: '',
    serviceType: 'Maintenance' as 'Maintenance' | 'Repair',
    status: 'Confirmed' as 'Confirmed' | 'Cancelled' | 'Completed',
  };

  const validationSchema = Yup.object().shape({
    clientId: Yup.string().required('Client is required'),
    vehicleId: Yup.string().required('Vehicle is required'),
    date: Yup.date().required('Date & Time is required').nullable(),
    serviceType: Yup.string().oneOf(['Maintenance', 'Repair']).required('Service type is required'),
    status: Yup.string().oneOf(['Confirmed', 'Cancelled', 'Completed']).required('Status is required'),
  });

  const handleSubmit = async (values: any) => {
    const newAppointment: AppointmentCredentials = {
      ...values,
      clientId: selectedClient?._id,
    } as AppointmentCredentials;

    try {
      const response = await addAppointment(newAppointment);
      console.log('Appointment added successfully:', response);
      navigate('/');
    } catch (error) {
      console.error('Failed to add appointment:', error);
      alert('Failed to add appointment. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          fontSize: 'larger',
        }}
      >
        Add Appointment
      </Box>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Autocomplete
              options={clients}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => handleClientChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Client"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={Boolean(touched.clientId && errors.clientId)}
                  helperText={touched.clientId && errors.clientId}
                />
              )}
            />

            <Field
              as={TextField}
              select
              name="vehicleId"
              label="Select Vehicle"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.vehicleId && errors.vehicleId)}
              helperText={touched.vehicleId && errors.vehicleId}
              disabled={!selectedClient}
            >
              {selectedClient?.vehicles.map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.licensePlate}
                </MenuItem>
              ))}
            </Field>

            <Field
              as={TextField}
              label="Date"
              name="date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.date && errors.date)}
              helperText={touched.date && errors.date}
            />

            <Field
              as={TextField}
              select
              name="serviceType"
              label="Service Type"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.serviceType && errors.serviceType)}
              helperText={touched.serviceType && errors.serviceType}
            >
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Repair">Repair</MenuItem>
            </Field>

            <Field
              as={TextField}
              select
              name="status"
              label="Status"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.status && errors.status)}
              helperText={touched.status && errors.status}
            >
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Field>

            <Button type="submit" variant="contained" size="small" color="primary" sx={{ mt: 2 }}>
              Add Appointment
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddAppointment;
