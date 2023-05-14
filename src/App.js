// routes
import { Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
// theme
import ThemeProvider from './theme';
// components
import NoAuth from './NoAuth';
import PersistLogin from './PersistLogin';
import RequireAuth from './RequireAuth';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import DashboardLayout from './layouts/dashboard';
import DashboardApp from './pages/DashboardApp';
import Login from './pages/Login';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function App() {
  const protectedRoutes = [{ path: 'dashboard', element: <DashboardApp /> }];
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />

      <Routes>
        <Route element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<NoAuth />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route element={<DashboardLayout />}>
                {protectedRoutes.map((route) => (
                  <Route path={route.path} element={route.element} />
                ))}
              </Route>
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}
