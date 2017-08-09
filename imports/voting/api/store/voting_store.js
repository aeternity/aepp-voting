export default {
  namespaced: true,

  state: () => ({
    filter: 'all',
    limit: 10,
    proposalType: 'agree',
    proposal: null,
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
    vote({ state }, signature) {
      Meteor.call('proposals.vote', state.proposal._id, signature, state.proposalType === 'agree', (err) => {
        if (err) {
          console.error(err);
        }
      })
    },
    voteByWeb3({ state, commit }, upVote) {
      const { eth: { sign, defaultAccount }, sha3 } = window.web3;
      sign(defaultAccount, sha3(state.proposal.statement), (err, signature) => {
        if (err) return console.error(err);
        Meteor.call('proposals.vote', state.proposal._id, signature, upVote, (err) => {
          commit('toggleProposalModal');
          swal({
            title: "Thank you!",
            text: "Your vote received!",
            type: "success",
            timer: 2000,
          });
          if (err) console.error(err);
        })
      });
    },
  },
}
