<template>
  <ae-main>
    <app-header />
    <proposal-list-header v-if="$route.name === 'proposal-list'" />
    <explanation-block />
    <router-view />
    <create-proposal-modal />
    <sign-message-modal />
    <youtube-video-modal />
  </ae-main>
</template>

<script>
import { AeMain } from '@aeternity/aepp-components';
import AppHeader from './components/AppHeader.vue';
import CreateProposalModal from './components/CreateProposalModal.vue';
import ProposalListHeader from './components/ProposalListHeader.vue';
import ExplanationBlock from './components/ExplanationBlock.vue';
import YoutubeVideoModal from './components/YoutubeVideoModal.vue';
import SignMessageModal from './components/SignMessageModal.vue';

export default {
  components: {
    AeMain,
    AppHeader,
    CreateProposalModal,
    ProposalListHeader,
    ExplanationBlock,
    YoutubeVideoModal,
    SignMessageModal,
  },
};
</script>
