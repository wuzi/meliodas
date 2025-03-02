const state = () => ({
  count: {
    materials: 0,
    users: 0,
  },
});

const getters = {
  count: (state) => state.count,
};

const actions = {
  async fetchCounts({ commit }) {
    const { data } = await this.$http.get(`/counts`);
    commit("setCounts", data);
  }
};

const mutations = {
  setCounts(state, data) {
    state.count = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
