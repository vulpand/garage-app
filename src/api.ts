import axios from 'axios';
import { UserCredentials, RegisterCredentials, VehicleCredentials, ClientCredentials } from './types';

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

export const getAllVehicles = async () => {
  try {
    const response = await axiosInstance.get('/vehicles');
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const getVehicleDetails = async (id: string) => {
  const response = await axiosInstance.get(`/vehicles/${id}`);
  return response.data;
};

export const addVehicle = async (vehicleData: VehicleCredentials) => {
  try {
    const response = await axiosInstance.post('/vehicles', vehicleData);
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const getAllClients = async () => {
  try {
    const response = await axiosInstance.get('/clients');
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const addClient = async (clientData: ClientCredentials) => {
  try {
    const response = await axiosInstance.post('/clients', clientData);
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};