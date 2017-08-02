import _ from 'underscore';

import { Proposals } from './proposals';

Proposals.remove({});
_.range(0, 100).forEach(i => {
  const agreed = _.random(1000, 10000000);
  const doubt = _.random(1000, 10000000);
  const total = Math.abs(agreed - doubt);
  Proposals.insert({
    title: `Proposal ${i}. Some long proposal text to be agreed or doubted`,
    createdAt: new Date(),
    updatedAt: new Date(),
    total,
    agreed,
    doubt,
  });
});
