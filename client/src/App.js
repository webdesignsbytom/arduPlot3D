import { Route, Routes } from 'react-router-dom';
// Pages
import HomePage from './pages/home/HomePage';
import LoginPage from './users/login/LoginPage';
import RegisterPage from './users/register/RegisterPage';
import TestPage from './pages/test/TestPage';
import Error404 from './pages/error/Error404';
import DesignPage from './pages/design/DesignPage';
import LibraryPage from './pages/library/LibraryPage';

function App() {
  return (
    <Routes>
      <Route path='/' index element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<RegisterPage />} />
      <Route path='/design' element={<DesignPage />} />
      <Route path='/library' element={<LibraryPage />} />
      <Route path='/test' element={<TestPage />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}

export default App;
