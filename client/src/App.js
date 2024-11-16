import { Route, Routes } from 'react-router-dom';
// Pages
import HomePage from './pages/home/HomePage';
import LoginPage from './users/login/LoginPage';
import RegisterPage from './users/register/RegisterPage';
import TestPage from './pages/test/TestPage';
import Error404 from './pages/error/Error404';
import LibraryPage from './pages/library/LibraryPage';
import SimulationPage from './pages/simulation/SimulationPage';
import ConfigurationPage from './pages/config/ConfigurationPage';
import ForgettenPasswordPage from './pages/user/ForgettenPasswordPage';
import MaintenancePage from './pages/maintenance/MaintenancePage';
// Constants
import {
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  SIGN_UP_PAGE_URL,
  SIMULATION_PAGE_URL,
  LIBRARY_PAGE_URL,
  CONFIGURATION_PAGE_URL,
  TEST_PAGE_URL,
  ERROR_404_PAGE_URL,
  RESET_PASS_PAGE_URL,
  MAINTENANCE_PAGE_URL,
} from './utils/Constants';
// Utils
import { AuthenticateAdmin } from './utils/AuthenticateUser';

function App() {
  return (
    <Routes>
      <Route path={HOME_PAGE_URL} index element={<HomePage />} />
      <Route path={SIMULATION_PAGE_URL} element={<SimulationPage />} />
      <Route path={LIBRARY_PAGE_URL} element={<LibraryPage />} />
      <Route path={CONFIGURATION_PAGE_URL} element={<ConfigurationPage />} />

      {/* User routes */}
      <Route path={LOGIN_PAGE_URL} element={<LoginPage />} />
      <Route path={SIGN_UP_PAGE_URL} element={<RegisterPage />} />
      <Route path={RESET_PASS_PAGE_URL} element={<ForgettenPasswordPage />} />

      {/* Other */}
      <Route path={MAINTENANCE_PAGE_URL} element={<MaintenancePage />} />

      {/* Secured routes */}
      <Route
        path={TEST_PAGE_URL}
        element={
          <AuthenticateAdmin>
            <TestPage />
          </AuthenticateAdmin>
        }
      />

      {/* Error routes */}
      <Route path={ERROR_404_PAGE_URL} element={<Error404 />} />
    </Routes>
  );
}

export default App;
