export default {
  namespaced: true,

  state: () => ({
    filter: 'all',
    limit: 10,
    proposalModalShown: false,
  }),

  getters: {
    filter: state => state.filter,
  },

  mutations: {
    setFilter: (state, value) => {
      state.filter = value;
    },
    incrementLimit: (state) => {
      console.log('incrementing');
      state.limit = state.limit + 10;
    },
    toggleSubmitProposalModal: (state) => {
      state.submitProposalModalShown = !state.submitProposalModalShown;
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
