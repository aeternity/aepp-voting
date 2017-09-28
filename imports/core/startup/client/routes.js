import { ProposalList, ProposalDetail } from '/imports/voting';

export default [
  { path: '/', name: 'root', component: ProposalList },
  { path: '/sorting/:filter', name: 'proposal-list', component: ProposalList },
  { path: '/proposal/:id', component: ProposalDetail },
];
