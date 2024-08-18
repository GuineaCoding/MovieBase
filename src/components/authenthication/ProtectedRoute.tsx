import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './index'; 

const ProtectedRoute = ({ children }) => {
    const { session, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!session) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children; 
};

export default ProtectedRoute;
