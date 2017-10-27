import { Accounts } from 'meteor/accounts-base';
import utf8 from 'utf8';

import web3 from '/imports/ethereum/ui/utils/web3';
import { adminLoginStatement } from '/imports/ethereum/api/utils/genStatement';

export default {
  namespaced: true,

  state: () => ({
    limit: 10,
    createProposalModalShown: false,
    explanationBlockShown: true,
    youtubeVideoId: '',
    accountId: '',
    canSignByWeb3: false,
    admin: false,
    loggedIn: false,
    messageToSign: false,
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
    setAdmin: (state, admin) => {
      state.admin = admin;
    },
    setLoggedIn: (state, loggedIn) => {
      state.loggedIn = loggedIn;
    },
    setMessageToSign: (state, options) => {
      state.messageToSign = options;
    },
  },

  actions: {
    signMessage: async ({ state, commit }, message) => new Promise((resolve, reject) => {
      const handler = (error, signature) => {
        if (error) reject(error);
        else resolve(signature);
      };
      if (state.canSignByWeb3) {
        const { personal: { sign }, toHex } = web3;
        sign(toHex(utf8.encode(message)), state.accountId, handler);
      } else {
        commit('setMessageToSign', { message, handler });
      }
    }),
    async toggleAuth({ state, dispatch }) {
      if (state.loggedIn) {
        Meteor.logout();
      } else {
        const message = adminLoginStatement();
        const signature = await dispatch('signMessage', message);
        Accounts.callLoginMethod({
          methodArguments: [{ message, signature }],
          userCallback(error) {
            if (error) {
              const errorMessage = 'Sorry, you are unable to log in';
              const text = {
                'invalid-signature': 'Something wrong with signature',
                'no-tokens': 'You don\'t have Æternity tokens',
                'invalid-message': 'Message that you signed is different',
                timeout: 'Signed message has expired, please try again',
              }[error.error];
              swal({
                ...text
                  ? {title: errorMessage, text}
                  : console.error(error) || {
                  title: 'Something went wrong',
                  text: errorMessage,
                },
                type: 'error',
                animation: false,
              });
            } else {
              swal({
                title: 'You have successfully logged in',
                type: 'success',
                animation: false,
                timer: 3000,
              });
            }
          },
        });
      }
    },
    createProposal({ dispatch, commit }, { statement, signature, upVote, tags }) {
      return new Promise((resolve, reject) => {
        Meteor.call('proposals.add', statement, signature, upVote, tags, (error, result) => {
          if (error) {
            dispatch('handleError', { error, upVote, voting: false });
            reject(error);
          } else {
            const { accountId, proposalId } = result;
            commit('toggleCreateProposalModal');
            commit('setAccountId', accountId);
            resolve(proposalId);
            swal({
              title: 'Thank you',
              text: 'Your statement was published',
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
      was not ${voting ? 'received' : 'published'}`;
      const message = {
        'invalid-signature': {
          title: errorMessage,
          text: 'Something wrong with signature',
        },
        'no-tokens': {
          title: errorMessage,
          text: 'You don\'t have Æternity tokens',
        },
        'already-voted': {
          title: 'Invalid vote',
          text: [
            'You have already',
            upVote ? 'agreed to' : 'disagreed with',
            'this statement in the past'
          ].join(' '),
        },
      }[error.error] || {
        title: 'Something went wrong',
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
            title: 'Thank you',
            text: 'Your vote was received',
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
