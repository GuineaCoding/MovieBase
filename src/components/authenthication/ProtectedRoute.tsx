import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './index';
import { Height } from '@mui/icons-material';

const ProtectedRoute = ({ children }) => {
    const { session, loading } = useContext(AuthContext);
    const location = useLocation();

    console.log("Session:", session);
    console.log("Loading:", loading); 

    if (loading) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (!session) {

        console.log("Redirecting to sign-in, no session found.");
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
