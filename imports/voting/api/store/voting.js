import { Proposals } from '../models/proposals';
import web3 from '/imports/ethereum/ui/utils/web3';

export default {
  namespaced: true,

  state: () => ({
    limit: 10,
    proposalType: 'agree',
    proposal: null,
    submitProposalModalShown: false,
    accountId: '',
  }),

  mutations: {
    incrementLimit: (state) => {
      state.limit = state.limit + 10;
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
          commit('voting/setAccountId', accountId, { root: true });
        }
      });
    },
    voteByWeb3({ state, dispatch }) {
      const { eth: { accounts }, personal: { sign }, toHex } = web3;
      const statement = `I ${state.proposalType === 'agree' ? '' : 'dis'}agree that `
        + state.proposal.statement;
      sign(toHex(statement), accounts[0], (error, signature) => {
        if (error) dispatch('handleError', { error });
        else dispatch('vote', signature);
      });
    },
  },
}
