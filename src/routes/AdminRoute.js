import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SelfOrAdminRoute({ children }) {
    const { isAuthenticated, user } = useAuth();
    const { id } = useParams();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (Number(user.id) === Number(id)) {
        return children;
    }

    if (user?.type !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}
