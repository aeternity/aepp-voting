import { Proposals } from './proposals';

Meteor.publish('proposals.list', function proposals() {
  return Proposals.find();
});
