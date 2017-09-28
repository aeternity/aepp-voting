export default {
  namespaced: true,

  state: () => ({
    submitProposalModalShown: false,
    accountId: '',
  }),

  mutations: {
    toggleSubmitProposalModal: (state) => {
      state.submitProposalModalShown = !state.submitProposalModalShown;
    },
    setAccountId: (state, accountId) => {
      state.accountId = accountId;
    },
  },

  actions: {
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
