import ProposalList from '../../ui/pages/ProposalList.vue';
import ProposalDetail from '../../ui/pages/ProposalDetail.vue';

export default [
  { path: '/statements/:id/:vote?', name: 'proposal', component: ProposalDetail, props: true },
  { path: '/:sort?/:tag?', name: 'proposal-list', component: ProposalList, props: true },
];
