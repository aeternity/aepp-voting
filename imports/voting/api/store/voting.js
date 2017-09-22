import { Proposals } from '/imports/core';

export default {
  namespaced: true,

  state: () => ({
    filter: Proposals.filterTypes.NEWEST,
    limit: 10,
    proposalType: 'agree',
    proposal: null,
  }),

  mutations: {
    setFilter: (state, value) => {
      state.filter = value;
    },
    incrementLimit: (state) => {
      state.limit = state.limit + 10;
    },
    toggleSubmitProposalModal: (state) => {
      state.submitProposalModalShown = !state.submitProposalModalShown;
    },
    agreeOrDoubtProposal: (state, proposalOptions) => {
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
            upVote? 'agreed to' : 'disagreed with',
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
    vote({ state, commit, dispatch }, signature) {
      const upVote = state.proposalType === 'agree';
      Meteor.call('proposals.vote', state.proposal._id, signature, upVote, (error, result) => {
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
          commit('agreeOrDoubtProposal');
          commit('core/setAccountId', accountId, { root: true });
        }
      });
    },
    voteByWeb3({ state, dispatch }) {
      const { eth: { sign, defaultAccount }, sha3 } = window.web3;
      const statement = `I ${state.proposalType === 'agree' ? '' : 'dis'}agree that `
        + state.proposal.statement;
      sign(defaultAccount, sha3(statement), (error, signature) => {
        if (error) dispatch('handleError', { error });
        else dispatch('vote', signature);
      });
    },
  },
}
