export default {
  namespaced: true,

  state: () => ({
    submitProposalModalShown: false,
  }),

  getters: {
    submitProposalModalShown: state => state.submitProposalModalShown,
  },

  mutations: {
    toggleProposalModal: (state) => {
      console.log(!state.submitProposalModalShown);
      state.submitProposalModalShown = !state.submitProposalModalShown;
    },
  },

  actions: {
    doSomething({ commit }, value) {
      // Good place to call meteor methods
      console.log('Async stuff');
    }
  },
}