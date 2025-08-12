import { Navigate } from 'react-router-dom';

export default function HomeRedirect() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" replace />;

  switch (role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'owner':
      return <Navigate to="/owner/dashboard" replace />;
    case 'user':
      return <Navigate to="/user/dashboard" replace />;
    default:
      // If role is missing/invalid, logout by redirecting to login
      return <Navigate to="/login" replace />;
  }
}
