import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Proposals } from './proposals';

Meteor.methods({
  'proposals.remove': function proposalsRemove(proposalId) {
    check(proposalId, String);
    if (
      !this.userId ||
      !Meteor.settings.adminsAddresses
        .includes(Meteor.users.findOne(this.userId).services.ethereum.id)
    ) {
      throw new Meteor.Error('not-allowed');
    }

    Proposals.remove(proposalId);
  },
  'proposals.updateTags': function proposalsUpdateTags(proposalId, tags) {
    check(proposalId, String);
    check(tags, [String]);
    if (
      !this.userId ||
      !Meteor.settings.adminsAddresses
        .includes(Meteor.users.findOne(this.userId).services.ethereum.id)
    ) {
      throw new Meteor.Error('not-allowed');
    }

    Proposals.update(proposalId, { $set: { tags } });
  },
});
