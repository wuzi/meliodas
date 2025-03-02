const state = () => ({
  user: {
    name: localStorage.getItem("userName")
  },
  accessToken: localStorage.getItem("accessToken")
});

const getters = {
  user: state => {
    return state.user;
  },
  accessToken: state => {
    return state.accessToken;
  }
};

const actions = {
  async login({ commit }, { email, password }) {
    const data = { email, password };
    const response = await this.$http.post("auth/login", data);

    commit("loginMut", {
      user: response.data.user,
      accessToken: response.data.accessToken
    });

    this.$http.defaults.headers.common[
      "authorization"
    ] = `Bearer ${response.data.accessToken}`;

    return response.data;
  }
};

const mutations = {
  loginMut(state, { user, accessToken }) {
    state.user = user;
    state.accessToken = accessToken;

    localStorage.setItem("userName", user.name);
    localStorage.setItem("accessToken", accessToken);
  },

  logout(state) {
    state.user = { name: null };
    state.accessToken = null;

    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
