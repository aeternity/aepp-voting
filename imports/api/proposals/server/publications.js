import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Proposals } from '../proposals';

Meteor.publish('proposal', (id, accountId) => {
  check(id, String);
  check(accountId, String);

  return Proposals.find(
    id,
    {
      fields: {
        ...Proposals.publicFields,
        [`votes.${accountId}`]: 1,
      },
    },
  );
});

Meteor.publish('proposals.list', (sort, tag, limit, accountId) => {
  check(sort, Match.OneOf(...Object.keys(Proposals.sortTypes)));
  check(tag, Match.OneOf(Proposals.defaultTag, ...Proposals.tags));
  check(limit, Match.Integer);
  check(accountId, String);

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
