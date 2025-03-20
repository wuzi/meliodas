const UserCategoryTranslations = {
  'STUDENT': 'Estudante',
  'COLLABORATOR': 'Colaborador',
  'PROFESSOR': 'Professor',
  'OTHER': 'Outro',
};

const UserProfileTranslations = {
  'ADMIN': 'Administrador',
  'RESEARCH_COORDINATOR': 'Coordenador de Pesquisa',
  'EXTENSION_COORDINATOR': 'Coordenador de Extensão',
  'USER': 'Usuário',
};

const UserStatusTranslations = {
  'ACTIVE': 'Ativo',
  'INACTIVE': 'Inativo',
};

const state = () => ({
  users: [],
});

const getters = {
  users: (state) => state.users.map(user => ({
    ...user,
    category: UserCategoryTranslations[user.category] || user.category,
    profile: UserProfileTranslations[user.profile] || user.profile,
    status: UserStatusTranslations[user.status] || user.status,
  })),
};

const actions = {
  async createUser({ commit }, { user }) {
    const { data } = await this.$http.post(`/users`, user);
    commit("addUser", data);
    return data;
  },
  async fetchUsers({ commit }) {
    const { data } = await this.$http.get(`/users`);
    commit("setUsers", data);
  },
  async editUser({ commit }, { id, user }) {
    const { data } = await this.$http.patch(`/users/${id}`, user);
    commit("updateUser", { id, data });
    return data;
  },
  async fetchUser({ commit }, { id }) {
    const { data } = await this.$http.get(`/users/${id}`);
    commit("updateUser", { id, data });
    return data;
  },
  async deleteUser({ commit }, { id }) {
    await this.$http.delete(`/users/${id}`);
    commit("removeUser", id);
  },
  async uploadProfilePicture({ commit }, { id, file }) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await this.$http.post(`/users/${id}/picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    commit("updateUser", { id, data });
    return data;
  },
};

const mutations = {
  addUser(state, data) {
    state.users.unshift(data);
  },
  setUsers(state, data) {
    state.users = data;
  },
  updateUser(state, { id, data }) {
    const index = state.users.findIndex(user => user.id === id);
    if (index !== -1) {
      state.users.splice(index, 1, data);
    }
  },
  removeUser(state, id) {
    state.users = state.users.filter(user => user.id !== id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
