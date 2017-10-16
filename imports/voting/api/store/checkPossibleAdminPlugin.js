import { Meteor } from 'meteor/meteor';

export default (store) => {
  const updatePossibleAdmin = (accountId) => {
    Meteor.call('accounts.checkPossibleAdmin', accountId, (error, result) => {
      if (error) throw error;
      if (store.state.voting.possibleAdmin === result) return;
      store.commit('voting/setPossibleAdmin', result);
    });
  };

  if (store.state.voting.accountId) {
    updatePossibleAdmin(store.state.voting.accountId);
  }

  store.subscribe(({ type, payload: accountId }) => {
    if (type !== 'voting/setAccountId') return;
    updatePossibleAdmin(accountId);
  });
};
