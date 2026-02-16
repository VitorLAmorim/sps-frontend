import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { UserService } from '../services/UserService';
import NavBar from '../components/NavBar';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();
    const { showError } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await UserService.getAll();
                setUsers(data);
            } catch (err) {
                showError(err.message || 'Erro ao carregar usuários.');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [token]);

    async function handleDelete(id) {
        try {
            await UserService.delete(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            showError(err.message || 'Erro ao excluir.');
        }
    }

    return (
        <div className="app">
            <NavBar />
            <main className="page">
                <h2 className="page__title">Usuários</h2>
                {loading ? (
                    <p className="empty">Carregando…</p>
                ) : users.length === 0 ? (
                    <div className="card-list">
                        <p className="empty">Nenhum usuário cadastrado.</p>
                    </div>
                ) : (
                    <div className="card-list">
                        {users.map(u => (
                            <div key={u.id} className="card-list__item">
                                <div className="card-list__main">
                                    <span className="card-list__name">{u.name}</span>
                                    <span className="card-list__email">{u.email}</span>
                                </div>
                                    <div className="card-list__actions">

                                        {user?.type === 'admin' || user.id === u.id && (
                                        <button type="button" className="btn btn--secondary" onClick={() => navigate(`/users/edit/${u.id}`)}>
                                            Editar
                                        </button>
                                        )}

                                        {user?.type === 'admin' && (
                                        <button type="button" className="btn btn--danger" onClick={() => handleDelete(u.id)}>
                                            Excluir
                                        </button>
                                            )}
                                    </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
