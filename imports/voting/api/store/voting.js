export default {
  namespaced: true,

  state: () => ({
    filter: 'all',
    limit: 10,
    proposalType: 'agree',
    proposal: null,
  }),

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
    toggleProposalModal: (state, proposalOptions) => {
      if (proposalOptions) {
        const { proposal, type } = proposalOptions;
        state.proposal = proposal;
        state.proposalType = type;
      } else {
        state.proposal = null;
      }
    },
    setProposalType: (state, type) => {
      state.proposalType = type;
    },
  },

  actions: {
    handleError(unusedStore, error) {
      swal({
        title: 'Something went wrong!',
        text: 'Your vote was not received!',
        type: 'error',
        animation: false,
      });
      console.error(error);
    },
    vote({ state, commit, dispatch }, signature) {
      const upVote = state.proposalType === 'agree';
      Meteor.call('proposals.vote', state.proposal._id, signature, upVote, (error) => {
        if (error) dispatch('handleError', error);
        else {
          swal({
            title: 'Thank you!',
            text: 'Your vote was received!',
            type: 'success',
            animation: false,
            timer: 3000,
          });
          commit('toggleProposalModal');
        }
      });
    },
    voteByWeb3({ state, dispatch }) {
      const { eth: { sign, defaultAccount }, sha3 } = window.web3;
      const statement = `I ${state.proposalType === 'agree' ? '' : 'dis'}agree that `
        + state.proposal.statement;
      sign(defaultAccount, sha3(statement), (error, signature) => {
        if (error) dispatch('handleError', error);
        else dispatch('vote', signature);
      });
    },
  },
}
