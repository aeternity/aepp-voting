import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export default (store) => {
  Tracker.autorun(() => {
    store.commit('voting/setLoggedIn', !!Meteor.userId());
  });
};
