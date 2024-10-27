import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, userRole }) => {
  const { user, token,role } = useSelector((state) => state.auth);

  if (!user || !token) {
    return <Navigate to="/signin" />;
  }

  if (userRole &&  role !== userRole) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
