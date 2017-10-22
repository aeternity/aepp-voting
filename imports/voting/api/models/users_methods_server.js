import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'users.admin'() {
    if (!this.userId) throw new Meteor.Error('not-allowed');

    return Meteor.settings.adminsAddresses.includes(
      Meteor.users.findOne(this.userId).services.ethereum.id);
  },
});
