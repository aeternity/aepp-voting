/* eslint-disable no-param-reassign */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import utf8 from 'utf8';
import createPersistedState from 'vuex-persistedstate';
import web3 from './web3';
import { adminLoginStatement } from '../utils/genStatement';
import syncAuthState from './plugins/syncAuthState';
import web3Sync from './plugins/web3Sync';

export default {
  plugins: [
    createPersistedState({
      paths: ['accountId', 'explanationBlockShown'],
    }),
    syncAuthState,
    web3Sync,
  ],

  state: () => ({
    createProposalModalShown: false,
    explanationBlockShown: true,
    youtubeVideoId: '',
    accountId: '',
    canSignByWeb3: false,
    admin: false,
    loggedIn: false,
    messageToSign: false,
    notification: '',
  }),

  mutations: {
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
    setNotification: (state, notification) => {
      state.notification = notification;
    },
  },

  actions: {
    notify({ commit }, options) {
      const { text, autoClose } = options.text ? options : { text: options };
      commit('setNotification', text);
      if (autoClose) setTimeout(() => commit('setNotification'), 3000);
    },
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
              const errorMessage = 'Sorry, you are unable to log in.';
              const text = {
                'invalid-signature': 'Something wrong with signature',
                'no-tokens': 'You don\'t have Æternity tokens',
                'invalid-message': 'Message that you signed is different',
                timeout: 'Signed message has expired, please try again',
              }[error.error];
              dispatch('notify', text
                ? `${errorMessage} ${text}`
                // eslint-disable-next-line no-console
                : console.error(error) || `Something went wrong. ${errorMessage}`);
            } else {
              dispatch('notify', {
                text: 'You have successfully logged in',
                autoClose: true,
              });
            }
          },
        });
      }
    },
    createProposal({ dispatch, commit }, {
      statement, signature, upVote, tags,
    }) {
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
            dispatch('notify', {
              text: 'Thank you! Your statement was published',
              autoClose: true,
            });
          }
        });
      });
    },
    handleError({ dispatch }, { error, upVote, voting: index = true }) {
      const errorMessage = `Your ${index ? 'vote' : 'statement'}
      was not ${index ? 'received' : 'published'}.`;
      const message = {
        'invalid-signature': `${errorMessage} Something wrong with signature`,
        'no-tokens': `${errorMessage} You don't have Æternity tokens`,
        'already-voted': [
          'Invalid vote. You have already',
          upVote ? 'agreed to' : 'disagreed with',
          'this statement in the past',
        ].join(' '),
        // eslint-disable-next-line no-console
      }[error.error] || console.error(error) || `Something went wrong. ${errorMessage}`;
      dispatch('notify', message);
    },
    vote({ commit, dispatch }, { proposalId, signature, upVote }) {
      Meteor.call('proposals.vote', proposalId, signature, upVote, (error, result) => {
        if (error) dispatch('handleError', { error, upVote });
        else {
          const { accountId } = result;
          dispatch('notify', {
            text: 'Thank you! Your vote was received',
            autoClose: true,
          });
          commit('setAccountId', accountId);
        }
      });
    },
  },
};
