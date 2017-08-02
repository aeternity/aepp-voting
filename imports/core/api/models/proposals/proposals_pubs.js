import { Proposals } from './proposals';

Meteor.publish('proposals.list', function proposals(limit) {
  return Proposals.find({}, { limit });
});
