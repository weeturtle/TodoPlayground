import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './provider/authProvider';
import HomePage from './components/home';
import LoginPage from './components/login';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
