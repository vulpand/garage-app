import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION } from '../Navigation';
import { demoTheme } from '../../theme/theme';
import Content from './Content';
import { useAuth } from '../../context/AuthenticationContext';
import { SignInPage, SignUpPage, ForgotPasswordPage } from '../login';
import NotFound from '../NotFound';

interface LayoutProps {
  window?: Window;
}

const Layout = (props: LayoutProps) => {
  const { session, signOut } = useAuth(); 
  const userRole = session?.user?.role;
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
          <Route path="/" element={<Content />} />
            <Route path="/dashboard" element={<Content />} />
            <Route path="/vehicles" element={<Content />} />
            <Route path="/users" element={<Content />} />
            // {userRole === 'admin' && <Route path="/users" element={<Content />} /> }
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      ) : (
        //not logged in
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      )}
    </AppProvider>
  );
};

export default Layout;
