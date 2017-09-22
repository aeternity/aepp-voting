import { ProposalList, ProposalDetail } from '/imports/voting';

export default [
  { path: '/', name: 'voting', component: ProposalList },
  { path: '/proposal/:id', component: ProposalDetail },
];
