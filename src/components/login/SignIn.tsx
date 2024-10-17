import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthenticationContext';
import { UserCredentials } from '../../types';
import { loginUser } from '../../api';
import { useState } from 'react';

function SignInPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { signInWithGoogle, signInWithFacebook, signIn } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,  // Add rememberMe to initialValues
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('values', values)
        const userData = await loginUser(values as UserCredentials);
        signIn(userData);

        // Store token based on rememberMe
        if (values.rememberMe) {
          localStorage.setItem('authToken', userData.token);  // Store in localStorage
        } else {
          sessionStorage.setItem('authToken', userData.token);  // Store in sessionStorage
        }

        navigate('/dashboard');
      } catch (error) {
        setErrorMessage('Invalid email or password');
        console.error('Login error:', error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}

          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                color="primary"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
            }
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<Google />}
            onClick={signInWithGoogle}
            sx={{ mb: 2 }}
          >
            Sign in with Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<Facebook />}
            onClick={signInWithFacebook}
          >
            Sign in with Facebook
          </Button>

          <Box display="flex" justifyContent="space-between">
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/sign-up')}
            >
              Sign up
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignInPage;
