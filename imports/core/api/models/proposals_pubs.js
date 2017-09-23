import { Meteor } from 'meteor/meteor';
import { Proposals } from './proposals';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('proposal', function proposal(id) {
  return Proposals.find(id);
})

Meteor.publish('proposals.list', function proposals(filter, limit, accountId) {
  const { ACTIVE, CONTROVERSIAL, DECIDED, VALID, INVALID, NEWEST, POPULAR } = Proposals.filterTypes;
  const selector = {
    [ACTIVE]: { updatedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    [CONTROVERSIAL]: { $and: [{ upVoteRatio: { $gte: 0.25 } }, { upVoteRatio: { $lte: 0.75 }}] },
    [DECIDED]: { $or: [{ upVoteRatio: { $lte: 0.25 } }, { upVoteRatio: { $gte: 0.75 }}] },
    [VALID]: { upVoteRatio: { $gte: 0.75 } },
    [INVALID]: { upVoteRatio: { $lte: 0.25 } },
    [NEWEST]: {},
    [POPULAR]: {},
  }[filter];
  if (!selector) throw new Meteor.Error('invalid-filter');

  return Proposals.find(selector, {
    sort: Proposals.filterSort[filter] || { createdAt: -1 },
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
