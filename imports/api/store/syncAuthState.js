import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export default (store) => {
  Tracker.autorun(() => {
    const user = Meteor.user();
    store.commit('voting/setLoggedIn', !!user);
    if (user) {
      Meteor.call('users.admin', (error, result) => {
        if (error) throw error;
        store.commit('voting/setAdmin', result);
      });
      if (user.services) {
        store.commit('voting/setAccountId', user.services.ethereum.id);
      }
    }
  });
};
