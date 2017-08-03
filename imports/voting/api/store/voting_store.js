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
