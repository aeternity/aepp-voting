import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Proposals } from './proposals';

Meteor.publish('proposal', function proposal(id, accountId) {
  return Proposals.find(
    id,
    {
      fields: {
       ...Proposals.publicFields,
       [`votes.${accountId}`]: 1,
      },
    }
  );
});

Meteor.publish('proposals.list', function proposals(sort, tag, limit, accountId) {
  if (!Proposals.sortTypes[sort]) throw new Meteor.Error('invalid-sort');
  if (![Proposals.defaultTag, ...Proposals.tags].includes(tag)) {
    throw new Meteor.Error('invalid-tag');
  }

  return Proposals.find({
    ...tag === Proposals.defaultTag ? {} : { tags: tag },
  }, {
    sort: Proposals.sortTypes[sort],
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
