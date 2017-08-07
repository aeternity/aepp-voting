export default {
  namespaced: true,

  state: () => ({
    proposalModalShown: false,
    submitProposalModalShown: false,
  }),

  getters: {
    submitProposalModalShown: state => state.submitProposalModalShown,
  },

  mutations: {
    toggleProposalModal: (state) => {
      state.proposalModalShown = !state.proposalModalShown;
    },
    toggleSubmitProposalModal: (state) => {
      state.submitProposalModalShown = !state.submitProposalModalShown;
    },
  },

  actions: {
    doSomething({ commit }, value) {
      // Good place to call meteor methods
      console.log('Async stuff');
    },
    submitSubmitProposalForm({ commit }, title) {
      Meteor.call('proposals.add', title, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          commit('toggleSubmitProposalModal');
        }
      })
    }
  },
}
