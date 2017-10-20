import { Meteor } from 'meteor/meteor';
import { redditHot } from 'decay';

import { Proposals } from '../../api/models/proposals';

const updateScores = Meteor.bindEnvironment(() => {
  Proposals.find().forEach(({ _id, upVoteAmount, downVoteAmount, createdAt }) =>
    Proposals.update(_id, { $set: {
      popularScore: redditHot()(upVoteAmount, downVoteAmount, createdAt),
    } }));
  setTimeout(updateScores, 1000 * 60 * 5);
});

updateScores();
