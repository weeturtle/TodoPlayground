import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './provider/authProvider';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import PrivateRoute from './components/routes';
import Layout from './components/routes/layout';
import ErrorPage from './pages/ErrorPage';
import RegisterPage from './pages/register';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
