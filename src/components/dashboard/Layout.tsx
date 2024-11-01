import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION } from '../Navigation';
import { demoTheme } from '../../theme/theme';
import { useAuth } from '../../context/AuthenticationContext';
import { SignInPage, SignUpPage, ForgotPasswordPage } from '../login';
import NotFound from '../NotFound';
import AddVehicle from '../AddVehicle';
import AddClient from '../AddClient';
import InvoiceGenerator from '../statement/Invoice';
import { BordTable, ClientTable, VehicleTable, DocumentTable } from '../table';
import AddAppointment from '../AddAppointment';

interface LayoutProps {
  window?: Window;
}

const Layout = (props: LayoutProps) => {
  const { session, signOut } = useAuth(); 
  // const userRole = session?.user?.role;
  const navigate = useNavigate();
  const location = useLocation();

  const router = {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (url: string | URL) => navigate(url)
  };

  return (
    <AppProvider
      branding={{ title: "Garage", logo: "" }}
      session={session}
      router={router}
      authentication={{ signIn: () => {}, signOut: signOut }}
      navigation={NAVIGATION}
      theme={demoTheme}
    >
      {session ? (
        //logged in
        <DashboardLayout>
          <Routes>
            <Route path="/"  element={<Navigate to="/dashboard" replace />}/>
            <Route path="/dashboard" element={<BordTable />} />
            <Route path="/vehicles" element={<VehicleTable />} />
            <Route path="/clients" element={<ClientTable />} />
            <Route path="/add-appointment" element={<AddAppointment />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/statement/invoice" element={<InvoiceGenerator />} />
            <Route path="/statement/document" element={<DocumentTable />} />
            {/* {userRole === 'admin' && <Route path="/users" element={< />} /> } */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      ) : (
        //not logged in
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />}/> 
        </Routes>
      )}
    </AppProvider>
  );
};

export default Layout;
