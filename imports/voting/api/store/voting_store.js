export default {
  namespaced: true,

  state: () => ({
    filter: 'all',
    limit: 10,
  }),

  getters: {
    filter: state => state.filter,
  },

  mutations: {
    setFilter: (state, value) => {
      console.log(value);
      state.filter = value;
    },
    incrementLimit: (state) => {
      console.log('incrementing');
      state.limit = state.limit + 10;
    },
  },

  actions: {
    doSomething({ commit }, value) {
      console.log('Async stuff');
    }
  },
}