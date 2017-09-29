import { WebApp } from 'meteor/webapp';

import { Proposals } from '../../api/models/proposals';

WebApp.connectHandlers.use('/proposals', ({ url }, res) => {
  const proposal = Proposals.findOne(url.slice(1), { fields: {
    ...Proposals.publicFields,
    votes: 1,
  } });
  res.writeHead(proposal ? 200 : 404);
  res.end(proposal ? JSON.stringify(proposal, undefined, 2) : undefined);
});
