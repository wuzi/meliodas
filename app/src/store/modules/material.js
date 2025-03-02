const state = () => ({
  materials: [],
});

const getters = {
  materials: (state) => state.materials,
};

const actions = {
  async createMaterial({ commit }, { material }) {
    const { data } = await this.$http.post(`/materials`, material);
    commit("addMaterial", data);
  },
  async fetchMaterials({ commit }) {
    const { data } = await this.$http.get(`/materials`);
    commit("setMaterials", data);
  }
};

const mutations = {
  addMaterial(state, data) {
    state.materials.unshift(data);
  },
  setMaterials(state, data) {
    state.materials = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
