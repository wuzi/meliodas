const state = () => ({
  users: [],
});

const getters = {
  users: (state) => state.users,
};

const actions = {
  async createUser({ commit }, { user }) {
    const { data } = await this.$http.post(`/users`, user);
    commit("addUser", data);
  },
  async fetchUsers({ commit }) {
    const { data } = await this.$http.get(`/users`);
    commit("setUsers", data);
  }
};

const mutations = {
  addUser(state, data) {
    state.users.unshift(data);
  },
  setUsers(state, data) {
    state.users = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
