import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';

import { Proposals } from '../../api/models/proposals';

Migrations.add({
  version: 1,
  name: 'proposals: Add `upVoteRatio` field',
  up() {
    Proposals.find({}).forEach(({ _id, upVoteAmount, downVoteAmount }) =>
      Proposals.update(_id, { $set: {
        upVoteRatio: upVoteAmount / (upVoteAmount + downVoteAmount),
      } }));
  },
  down() {
    Proposals.update({}, { $unset: { upVoteRatio: 1 } }, { multi: true, validate: false });
  },
});

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
