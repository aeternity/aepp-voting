export default {
  namespaced: true,

  state: () => ({
    limit: 10,
    createProposalModalShown: false,
    accountId: '',
  }),

  mutations: {
    incrementLimit: (state) => {
      state.limit = state.limit + 10;
    },
    toggleCreateProposalModal: (state) => {
      state.createProposalModalShown = !state.createProposalModalShown;
    },
    setAccountId: (state, accountId) => {
      state.accountId = accountId;
    },
  },

  actions: {
    createProposal({ dispatch, commit }, { statement, signature, upVote }) {
      return new Promise((resolve, reject) => {
        Meteor.call('proposals.add', statement, signature, upVote, (error, result) => {
          if (error) {
            dispatch('handleError', { error, upVote });
            reject(error);
          } else {
            const { accountId, proposalId } = result;
            commit('toggleCreateProposalModal');
            commit('setAccountId', accountId);
            resolve(proposalId);
          }
        });
      });
    },
    handleError(unusedStore, { error, upVote }) {
      const message = {
        'invalid-signature': {
          title: 'Your vote was not received!',
          text: 'Something wrong with signature',
        },
        'no-tokens': {
          title: 'Your vote was not received!',
          text: 'You don\'t have Aeternity tokens',
        },
        'already-voted': {
          title: 'Invalid vote!',
          text: [
            'You have already',
            upVote ? 'agreed to' : 'disagreed with',
            'this proposal in the past'
          ].join(' '),
        },
      }[error.error] || {
        title: 'Something went wrong!',
        text: 'Your vote was not received!',
      };
      swal({
        ...message,
        type: 'error',
        animation: false,
      });
      console.error(error);
    },
    vote({ commit, dispatch }, { proposalId, signature, upVote }) {
      Meteor.call('proposals.vote', proposalId, signature, upVote, (error, result) => {
        if (error) dispatch('handleError', { error, upVote });
        else {
          const { accountId } = result;
          swal({
            title: 'Thank you!',
            text: 'Your vote was received!',
            type: 'success',
            animation: false,
            timer: 3000,
          });
          commit('setAccountId', accountId);
        }
      });
    },
  },
}
