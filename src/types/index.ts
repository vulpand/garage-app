export interface UserCredentials {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role: "user"
  }

  export interface VehicleCredentials {
    licensePlate: string,
    brand: string,
    model: string,
    year: number,
    mileage: number,
    clientId: string,
    repairHistory: Array<any>;
    details?: string;
  }

  export interface ClientCredentials {
    name: string;
    email: string;
    phoneNumber: number;
    vehicles: {id: string}[];
  }

  export interface InvoiceCredentials {
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    [key: string]: any; 
  }