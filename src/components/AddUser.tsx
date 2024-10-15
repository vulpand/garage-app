import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AddNewUser = () => {
  const navigate = useNavigate();

  const initialValues ={
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    address: '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().oneOf(['admin', 'mechanic', 'client'], 'Invalid role').required('Role is required'),
    phoneNumber: Yup.string(),
    address: Yup.string(),
  });

  const handleSubmit = (values: any) => {
    // Submit logic goes here (e.g., API call)
    console.log('Form Values:', values);
    alert('User added successfully!');

    // Navigate back to the vehicle table (or any other page)
    navigate('/vehicles');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New User
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
                name="password"
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                name="role"
                label="Role"
                fullWidth
                select
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="mechanic">Mechanic</MenuItem>
                <MenuItem value="client">Client</MenuItem>
              </Field>
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
                name="address"
                label="Address"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />

              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Add User
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddNewUser;
