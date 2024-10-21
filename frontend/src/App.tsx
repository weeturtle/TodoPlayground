import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './provider/authProvider';
import HomePage from './components/home';
import LoginPage from './components/login';
import PrivateRoute from './components/routes';
import Layout from './components/routes/layout';
import ErrorPage from './components/ErrorPage';
import RegisterPage from './components/register';
import ProfilePage from './components/profile';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
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
