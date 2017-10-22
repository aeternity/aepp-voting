import ProposalList from '../../ui/pages/ProposalList.vue';
import ProposalDetail from '../../ui/pages/ProposalDetail.vue';
import StyleGuide from '../../ui/pages/StyleGuide';

export default [
  { path: '/', name: 'root', component: ProposalList },
  { path: '/sorting/:sort', name: 'proposal-list', component: ProposalList, props: true },
  { path: '/statements/:id/:vote?', name: 'proposal', component: ProposalDetail, props: true },
  { path: '/style-guide', name: 'style-guide', component: StyleGuide, props: true },
];
