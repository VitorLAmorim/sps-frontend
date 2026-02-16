import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Home() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="app">
            <NavBar />
            <main className="page">
                <h2 className="page__title">Início</h2>
                <p style={{ margin: 0, color: '#6b7280' }}>Use o menu acima para acessar a lista de usuários ou criar um novo.</p>
            </main>
        </div>
    );
}
