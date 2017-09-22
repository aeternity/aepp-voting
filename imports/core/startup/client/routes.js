import VotingPage from '/imports/voting/ui/pages/VotingPage'
import SingleProposal from '/imports/voting/ui/pages/SingleProposal'

export default [
  { path: '/', name: 'voting', component: VotingPage },
  { path: '/proposal/:id', name: 'single-vote', component: SingleProposal },
];
