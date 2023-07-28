import { Navigate } from 'react-router-dom';

export default function ProtectedRoute ({token, children, redirectTo}) {
    return token ? children: <Navigate to={redirectTo}/>;
}