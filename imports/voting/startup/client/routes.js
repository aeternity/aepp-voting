import ProposalList from '../../ui/pages/ProposalList.vue';
import ProposalDetail from '../../ui/pages/ProposalDetail.vue';

export default [
  { path: '/', name: 'root', component: ProposalList },
  { path: '/sorting/:filter', name: 'proposal-list', component: ProposalList },
  { path: '/statements/:id/:vote?', name: 'proposal', component: ProposalDetail, props: true },
];
