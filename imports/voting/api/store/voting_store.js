export default {
  namespaced: true,

  state: () => ({
    filter: 'all',
    proposalModalShown: false,
  }),

  getters: {
    filter: state => state.filter,
  },

  mutations: {
    setFilter: (state, value) => {
      state.filter = value;
    },
    toggleProposalModal: (state) => {
      state.proposalModalShown = !state.proposalModalShown;
    },
  },

  actions: {
    doSomething({ commit }, value) {
      console.log('Async stuff');
    }
  },
}