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
  },
  async fetchMaterial({ commit }, { id }) {
    const { data } = await this.$http.get(`/materials/${id}`);
    commit("updateMaterial", { id, data });
    return data;
  },
  async editMaterial({ commit }, { id, material }) {
    const { data } = await this.$http.patch(`/materials/${id}`, material);
    commit("updateMaterial", { id, data });
  },
  async deleteMaterial({ commit }, { id }) {
    await this.$http.delete(`/materials/${id}`);
    commit("removeMaterial", id);
  }
};

const mutations = {
  addMaterial(state, data) {
    state.materials.unshift(data);
  },
  setMaterials(state, data) {
    state.materials = data;
  },
  updateMaterial(state, { id, data }) {
    const index = state.materials.findIndex(material => material.id === id);
    if (index !== -1) {
      state.materials.splice(index, 1, data);
    }
  },
  removeMaterial(state, id) {
    state.materials = state.materials.filter(material => material.id !== id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
