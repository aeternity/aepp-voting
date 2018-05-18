import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { _ } from 'underscore';
import { Proposals } from '../../api/proposals/proposals';

if (Meteor.isDevelopment && Proposals.find().count() === 0) {
  _.times(100, () => Factory.create('proposal'));
}
