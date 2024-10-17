import axios from 'axios';
import { UserCredentials, RegisterCredentials } from './types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const logError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios error:', {
      message: error.message,
      ...(error.response && {
        response: {
          status: error.response.status,
          data: error.response.data,
        },
      }),
    });
  } else {
    console.error('General error:', error);
  }
};

// Login function
export const loginUser = async (credentials: UserCredentials) => {
  try {
    console.log('Credentials:', credentials);
    const response = await axiosInstance.post('/auth/login', credentials);
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};

// Register function
export const registerUser = async (credentials: RegisterCredentials) => {
  try {
    console.log('Registering user with credentials:', credentials);
    const response = await axiosInstance.post('/auth/register', credentials);
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};