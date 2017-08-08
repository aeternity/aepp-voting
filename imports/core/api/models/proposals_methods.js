import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Proposals } from './proposals';

Meteor.methods({
  'proposals.add'(statement) {
    check(statement, String);

    Proposals.insert({ statement });
  },
});
