import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/useAuth';
import './Navbar.module.scss';

const Navbar = () => {
  const { token, setToken } = useAuth();

  const onLogout = () => {
    setToken('');
    return <Navigate to="/login" />;
  };

  return (
    <nav>
      {!token && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {token && (
        <>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
