import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import HomePage from './pages/home/HomePage';
import LoginPage from './users/login/LoginPage';
import RegisterPage from './users/register/RegisterPage';
import TestPage from './pages/test/TestPage';
import Error404 from './pages/error/Error404';
import LibraryPage from './pages/library/LibraryPage';
import SimulationDesignPage from './pages/simulation/SimulationDesignPage';
import ConfigurationPage from './pages/config/ConfigurationPage';
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
} from './utils/Constants';

function App() {
  return (
      <Routes>
        <Route path={HOME_PAGE_URL} index element={<HomePage />} />
        <Route path={LOGIN_PAGE_URL} element={<LoginPage />} />
        <Route path={SIGN_UP_PAGE_URL} element={<RegisterPage />} />
        <Route path={SIMULATION_PAGE_URL} element={<SimulationDesignPage />} />
        <Route path={LIBRARY_PAGE_URL} element={<LibraryPage />} />
        <Route path={CONFIGURATION_PAGE_URL} element={<ConfigurationPage />} />
        <Route path={TEST_PAGE_URL} element={<TestPage />} />
        <Route path={ERROR_404_PAGE_URL} element={<Error404 />} />
      </Routes>
  );
}

export default App;
