import { Proposals } from './proposals';

Meteor.publish('proposals.list', function proposals(filter, limit) {
  return Proposals.find({}, { limit });
});
