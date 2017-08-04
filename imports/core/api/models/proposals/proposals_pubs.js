import { Proposals } from './proposals';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('proposals.list', function proposals(filter, limit) {
  return Proposals.find({}, { limit });
});

Meteor.publish('proposals.count', function proposalsCount() {
  Counts.publish(this, 'proposals', Proposals.find());
});
