import { Meteor } from 'meteor/meteor';

Meteor.publish(null, function ethereumId() {
  return Meteor.users.find(this.userId, { fields: { 'services.ethereum.id': 1 } });
});
