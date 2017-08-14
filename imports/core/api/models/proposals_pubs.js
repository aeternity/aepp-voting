import { Proposals } from './proposals';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('proposals.list', function proposals(filter, limit, accountId) {
  return Proposals.find({}, {
    sort: { createdAt: -1 },
    limit,
    fields: {
      ...Proposals.publicFields,
      [`votes.${accountId}`]: 1,
    },
  });
});

Meteor.publish('proposals.count', function proposalsCount() {
  Counts.publish(this, 'proposals', Proposals.find());
});
