import { Proposals } from './proposals';

Meteor.publish('proposals.list', function proposals(filter) {
  console.log(filter);
  return Proposals.find();
});
