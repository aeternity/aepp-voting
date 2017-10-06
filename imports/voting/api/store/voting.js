export default {
  namespaced: true,

  state: () => ({
    limit: 10,
    createProposalModalShown: false,
    explanationBlockShown: true,
    youtubeVideoId: '',
    accountId: '',
    canSignByWeb3: false,
    possibleAdmin: false,
  }),

  mutations: {
    incrementLimit: (state) => {
      state.limit = state.limit + 10;
    },
    toggleCreateProposalModal: (state) => {
      state.createProposalModalShown = !state.createProposalModalShown;
    },
    toggleExplanationBlock: (state) => {
      state.explanationBlockShown = !state.explanationBlockShown;
    },
    setYoutubeVideoId: (state, youtubeVideoId) => {
      state.youtubeVideoId = youtubeVideoId;
    },
    setAccountId: (state, accountId) => {
      state.accountId = accountId;
    },
    setCanSignByWeb3: (state, canSignByWeb3) => {
      state.canSignByWeb3 = canSignByWeb3;
    },
    setPossibleAdmin: (state, possibleAdmin) => {
      state.possibleAdmin = possibleAdmin;
    },
  },

  actions: {
    login() {

    },
    createProposal({ dispatch, commit }, { statement, signature, upVote }) {
      return new Promise((resolve, reject) => {
        Meteor.call('proposals.add', statement, signature, upVote, (error, result) => {
          if (error) {
            dispatch('handleError', { error, upVote, voting: false });
            reject(error);
          } else {
            const { accountId, proposalId } = result;
            commit('toggleCreateProposalModal');
            commit('setAccountId', accountId);
            resolve(proposalId);
            swal({
              title: 'Thank you!',
              text: 'Your statement was published!',
              type: 'success',
              animation: false,
              timer: 3000,
            });
          }
        });
      });
    },
    handleError(unusedStore, { error, upVote, voting = true }) {
      const errorMessage = `Your ${voting ? 'vote' : 'statement'}
      was not ${voting ? 'received' : 'published'}!`;
      const message = {
        'invalid-signature': {
          title: errorMessage,
          text: 'Something wrong with signature',
        },
        'no-tokens': {
          title: errorMessage,
          text: 'You don\'t have Aeternity tokens',
        },
        'already-voted': {
          title: 'Invalid vote!',
          text: [
            'You have already',
            upVote ? 'agreed to' : 'disagreed with',
            'this statement in the past'
          ].join(' '),
        },
      }[error.error] || {
        title: 'Something went wrong!',
        text: errorMessage,
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
