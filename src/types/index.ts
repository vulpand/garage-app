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