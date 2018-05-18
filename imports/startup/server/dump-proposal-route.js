import { WebApp } from 'meteor/webapp';
import { Proposals } from '../../api/proposals/proposals';

WebApp.connectHandlers.use('/statements', ({ url }, res, next) => {
  if (!url.endsWith('/json')) { next(); return; }
  const proposal = Proposals.findOne(url.slice(1, -5), {
    fields: {
      ...Proposals.publicFields,
      votes: 1,
    },
  });
  res.writeHead(proposal ? 200 : 404);
  res.end(proposal ? JSON.stringify(proposal, undefined, 2) : undefined);
});
