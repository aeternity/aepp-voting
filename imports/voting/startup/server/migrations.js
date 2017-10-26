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

Migrations.add({
  version: 2,
  name: 'proposals: Add `totalVoteAmount` field',
  up() {
    Proposals.find({}).forEach(({ _id, upVoteAmount, downVoteAmount }) =>
      Proposals.update(_id, { $set: {
        totalVoteAmount: upVoteAmount + downVoteAmount,
      } }, { getAutoValues: false }));
  },
  down() {
    Proposals.update({}, { $unset: { totalVoteAmount: 1 } }, {
      multi: true, validate: false, getAutoValues: false });
  },
});

Migrations.add({
  version: 3,
  name: 'proposals: Reset `updateAt` field',
  up() {
    Proposals.find({}).forEach(({ _id, votes, createdAt }) =>
      Proposals.update(_id, { $set: {
        updatedAt: Math.max(createdAt, ...Object.values(votes).map(v => v.createdAt)),
      } }, { getAutoValues: false }));
  },
  down() {},
});

Migrations.add({
  version: 4,
  name: 'proposals: Add `tags` field',
  modify(up) {
    Proposals.update({}, { [up ? '$set' : '$unset']: { tags: [] } },
      { multi: true, validate: false, getAutoValues: false });
  },
  up() { this.modify(true); },
  down() { this.modify(false); },
});

Migrations.add({
  version: 5,
  name: 'proposals: Reset `tags` field',
  up() {
    Proposals.update({}, { $set: { tags: [] } }, { multi: true, getAutoValues: false });
  },
  down() {},
});

Meteor.startup(() => {
  if (Meteor.isDevelopment && Migrations.getVersion() === 0) {
    Migrations._setControl({
      version: Migrations._list[Migrations._list.length - 1].version,
      locked: false,
    });
  }
  Migrations.migrateTo('latest');
});
