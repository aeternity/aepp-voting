import { Proposals } from './proposals';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('proposals.list', function proposals(filter, limit, accountId) {
  return Proposals.find({}, {
    sort: { createdAt: -1 },
    limit,
    fields: {
      _id: 1,
      statement: 1,
      upVoteAmount: 1,
      downVoteAmount: 1,
      [`votes.${accountId}`]: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  });
});

Meteor.publish('proposals.count', function proposalsCount() {
  Counts.publish(this, 'proposals', Proposals.find());
});
