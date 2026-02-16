import { apiFetch } from './api'

export const UserService = {
  async getAll() {
   return apiFetch(`/users`);
  },
  async getById(id) {
      return apiFetch(`/users/${id}`);
  },
  async create(data) {
      return apiFetch(`/users`, { method: 'POST', body: JSON.stringify(data) });
  },
  async delete(id) {
      return apiFetch(`/users/${id}`, { method: 'DELETE' });
  },
  async update(id, data) {
      return apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }
}

