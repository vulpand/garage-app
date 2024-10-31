import { Box, TextField, Button, Typography, Paper, Tabs, Tab, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AppointmentCredentials, ClientCredentials, VehicleCredentials } from '../types';
import { addAppointment, getAllClients, getAllVehicles } from '../api';
import { useEffect, useState } from 'react';

const AddAppointment = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0); // 0: Existing Clients/Vehicles, 1: Add New Client
  const [clients, setClients] = useState<ClientCredentials[]>([]);
  const [vehicles, setVehicles] = useState<VehicleCredentials[]>([]);

  useEffect(() => {
    const fetchClientsAndVehicles = async () => {
      const fetchedClients = await getAllClients();
      const fetchedVehicles = await getAllVehicles();
      setClients(fetchedClients);
      setVehicles(fetchedVehicles);
    };
    fetchClientsAndVehicles();
  }, []);

  const initialValues = {
    clientId: '',
    vehicleId: '',
    clientName: '',
    phoneNumber: '',
    email: '',
    licensePlate: '',
    dateTime: '',
    serviceType: 'Maintenance' as 'Maintenance' | 'Repair', // Ensure type is correct
    status: 'Confirmed' as 'Confirmed' | 'Cancelled' | 'Completed', // Ensure type is correct
  };

  const validationSchema = Yup.object().shape({
    clientId: tabIndex === 0 ? Yup.string().required('Client is required') : Yup.string().optional(),
    vehicleId: tabIndex === 0 ? Yup.string().required('Vehicle is required') : Yup.string().optional(),
    clientName: tabIndex === 1 ? Yup.string().required('Name is required') : Yup.string().optional(),
    phoneNumber: tabIndex === 1 ? Yup.string().required('Phone number is required') : Yup.string().optional(),
    email: tabIndex === 1 ? Yup.string().email('Invalid email format').required('Email is required') : Yup.string().optional(),
    licensePlate: tabIndex === 1 ? Yup.string().required('License plate is required') : Yup.string().optional(),
    dateTime: Yup.date().required('Date & Time is required').nullable(),
    serviceType: Yup.string().oneOf(['Maintenance', 'Repair']).required('Service type is required'),
    status: Yup.string().oneOf(['Confirmed', 'Cancelled', 'Completed']).required('Status is required'),
  });

  const handleSubmit = async (values: any) => {
    // const { clientId, vehicleId, clientName, phoneNumber, email, licensePlate, dateTime, serviceType, status } = values;

    const newAppointment: AppointmentCredentials = {    } as AppointmentCredentials;

    try {
      console.log('Submitting Appointment Data:', newAppointment);
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
      <Typography variant="h4" gutterBottom>
        Add Appointment
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} sx={{ mb: 2 }}>
          <Tab label="Existing Clients/Vehicles" />
          <Tab label="Add New Client" />
        </Tabs>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, errors, touched }) => (
            <Form>
              {tabIndex === 0 && (
                <>
                  <Field
                    as={TextField}
                    select
                    name="clientId"
                    label="Select Client"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.clientId && errors.clientId)}
                    helperText={touched.clientId && errors.clientId}
                  >
                    {clients.map(client => (
                      <MenuItem key={client._id} value={client._id}>
                        {client.name}
                      </MenuItem>
                    ))}
                  </Field>

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
                  >
                    {vehicles.map(vehicle => (
                      <MenuItem key={vehicle._id} value={vehicle._id}>
                        {vehicle.licensePlate}
                      </MenuItem>
                    ))}
                  </Field>
                </>
              )}

              {tabIndex === 1 && (
                <>
                  <Field
                    as={TextField}
                    name="clientName"
                    label="Client Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.clientName && errors.clientName)}
                    helperText={touched.clientName && errors.clientName}
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
                    name="licensePlate"
                    label="License Plate"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.licensePlate && errors.licensePlate)}
                    helperText={touched.licensePlate && errors.licensePlate}
                  />
                </>
              )}

              <Field
                as={TextField}
                name="dateTime"
                label="Date & Time"
                type="datetime-local"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.dateTime && errors.dateTime)}
                helperText={touched.dateTime && errors.dateTime}
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

              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Appointment
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddAppointment;
