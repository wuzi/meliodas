const MaterialTypeTranslations = {
  'PERMANENT': 'Permanente',
  'CONSUMABLE': 'Consumível',
};

const MaterialStatusTranslations = {
  'ACTIVE': 'Ativo',
  'INACTIVE': 'Inativo',
};

const state = () => ({
  materials: [],
  lowStockMaterials: [],
});

const getters = {
  materials: (state) => state.materials.map(material => ({
    ...material,
    type: MaterialTypeTranslations[material.type] || material.type,
    status: MaterialStatusTranslations[material.status] || material.status,
  })),
  lowStockMaterials: (state) => state.lowStockMaterials.map(material => ({
    ...material,
    type: MaterialTypeTranslations[material.type] || material.type,
    status: MaterialStatusTranslations[material.status] || material.status,
  })),
};

const actions = {
  async createMaterial({ commit }, { material }) {
    const { data } = await this.$http.post(`/materials`, material);
    commit("addMaterial", data);
  },
  async fetchMaterials({ commit }, { params = {} } = {}) {
    const { data } = await this.$http.get(`/materials`, { params });
    commit("setMaterials", data);
  },
  async fetchMaterial({ commit }, { id }) {
    const { data } = await this.$http.get(`/materials/${id}`);
    commit("updateMaterial", { id, data });
    return data;
  },
  async editMaterial({ commit }, { id, material }) {
    const { data } = await this.$http.patch(`/materials/${id}`, { ...material, images: undefined });
    commit("updateMaterial", { id, data });
  },
  async deleteMaterial({ commit }, { id }) {
    await this.$http.delete(`/materials/${id}`);
    commit("removeMaterial", id);
  },
  async uploadMaterialImage({ commit }, { id, file }) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await this.$http.post(`/materials/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    commit("addMaterialImage", { id, data });
    return data;
  },
  async fetchLowStockMaterials({ commit}) {
    const { data } = await this.$http.get('/materials', {
      params: { lowStock: 'true' }
    });
    commit("setLowStockMaterials", data);
    return data;
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
  },
  addMaterialImage(state, { id, data }) {
    const index = state.materials.findIndex(material => material.id === id);
    if (index !== -1) {
      state.materials[index].images.push(data);
    }
  },
  setLowStockMaterials(state, data) {
    state.lowStockMaterials = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
