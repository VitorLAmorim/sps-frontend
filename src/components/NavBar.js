import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__left">
                    <button
                        type="button"
                        className={`btn btn--ghost ${isActive('/') && !location.pathname.startsWith('/users') ? 'header__link--active' : ''}`}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </button>
                    <span className="header__user">Olá, {user?.name}</span>
                </div>
                <nav className="header__nav">
                    <button
                        type="button"
                        className={`btn btn--ghost ${isActive('/users') ? 'header__link--active' : ''}`}
                        onClick={() => navigate('/users')}
                    >
                        Usuários
                    </button>
                    {user?.type === 'admin' && (
                        <button
                            type="button"
                            className="btn btn--secondary"
                            onClick={() => navigate('/users/new')}
                        >
                            Novo usuário
                        </button>
                    )}
                    <button type="button" className="btn btn--ghost" onClick={logout}>
                        Sair
                    </button>
                </nav>
            </div>
        </header>
    );
}
