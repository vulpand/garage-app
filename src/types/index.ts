// -------------------- Navigation --------------------

export interface NavigationItem {
  kind?: 'page' | 'divider';
  title?: string;
  segment?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
}

export type Navigation = NavigationItem[];

// -------------------- API --------------------

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: "user"
}

export interface UserCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AppointmentCredentials {
  _id: string;
  client: ClientCredentials;
  vehicle: VehicleCredentials;
  dateTime: Date;
  serviceType: 'Maintenance' | 'Repair';
  status: 'Confirmed' | 'Cancelled' | 'Completed';
}

export interface ClientCredentials {
  name: string;
  email: string;
  phoneNumber: number;
  vehicles: {id: string}[];
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

export interface InvoiceCredentials {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DocumentCredentioals {
  id: number;
  name: string;
  uploadDate: string;
}

// -------------------- Modals --------------------

export interface DeleteModalCredentioals {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  confirmMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export interface AddDocumentModalCredentioals {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { documentName: string; file: File | null }) => void;
}