import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Proposals } from './proposals';

Meteor.methods({
  'proposals.remove'(proposalId) {
    check(proposalId, String);
    if (!this.userId) throw new Meteor.Error('not-authorized');

    Proposals.remove(proposalId);
  },
});
