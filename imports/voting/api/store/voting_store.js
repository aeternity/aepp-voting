export default {
  namespaced: true,

  state: () => ({
    filter: 'all',
  }),

  getters: {
    filter: state => state.filter,
  },

  mutations: {
    setFilter: (state, value) => {
      console.log(value);
      state.filter = value;
    },
  },

  actions: {
    doSomething({ commit }, value) {
      console.log('Async stuff');
    }
  },
}