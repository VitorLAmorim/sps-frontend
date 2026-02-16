import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { UserService } from '../services/UserService';
import NavBar from '../components/NavBar';

export default function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const { showError, showSuccess } = useNotification();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        type: 'user'
    });
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id) return;
        async function fetchData() {
            try {
                const data = await UserService.getById(id);
                setForm({ ...data, password: '' });
            } catch (err) {
                showError(err.message || 'Erro ao carregar usuário.');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, token]);

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        try {
            if (id) {
                await UserService.update(id, form);
                showSuccess('Usuário atualizado.');
            } else {
                await UserService.create(form);
                showSuccess('Usuário criado.');
            }
            navigate('/users');
        } catch (err) {
            showError(err.message || 'Erro ao salvar.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="app">
                <NavBar />
                <main className="page">
                    <p className="empty">Carregando…</p>
                </main>
            </div>
        );
    }

    return (
        <div className="app">
            <NavBar />
            <main className="page">
                <h2 className="page__title">{id ? 'Editar usuário' : 'Novo usuário'}</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__group">
                        <label className="form__label" htmlFor="name">Nome</label>
                        <input
                            id="name"
                            className="form__input"
                            placeholder="Nome"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            className="form__input"
                            placeholder="email@exemplo.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="password">Senha {id && '(deixe em branco para não alterar)'}</label>
                        <input
                            id="password"
                            type="password"
                            className="form__input"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="type">Tipo</label>
                        <select
                            id="type"
                            className="form__select"
                            value={form.type}
                            onChange={e => setForm({ ...form, type: e.target.value })}
                        >
                            <option value="user">Usuário</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <div className="form__actions">
                        <button type="submit" className="btn btn--primary" disabled={saving}>
                            {saving ? 'Salvando…' : 'Salvar'}
                        </button>
                        <button type="button" className="btn btn--secondary" onClick={() => navigate('/users')}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
