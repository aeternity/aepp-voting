import _ from 'underscore';

import { Proposals } from './proposals';

Proposals.remove({});
_.range(0, 100).forEach(i => {
  Proposals.insert({
    statement: `Proposal ${i}. Some long proposal text to be agreed or doubted`,
    upVoteAmount: _.random(1000, 10000000),
    downVoteAmount: _.random(1000, 10000000),
  });
});
