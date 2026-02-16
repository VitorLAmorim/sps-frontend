import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { login as routeLogin } from '../services/AuthService';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { showError } = useNotification();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await routeLogin(email, password);
            login(data);
            navigate('/');
        } catch (err) {
            showError(err.message || 'Erro ao entrar.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="form__title">Entrar</h1>
                    <div className="form__group">
                        <label className="form__label" htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            className="form__input"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            className="form__input"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <div className="form__actions">
                        <button type="submit" className="btn btn--primary" disabled={loading}>
                            {loading ? 'Entrando…' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
