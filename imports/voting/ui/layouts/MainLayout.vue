<template>
  <ae-main>
    <app-header />
    <explanation-block />
    <router-view />
    <create-proposal-modal />
    <sign-message-modal />
    <youtube-video-modal />
  </ae-main>
</template>

<script>
  import AeMain from '../../../components/AeMain.vue';

  import AppHeader from '../components/AppHeader.vue';
  import CreateProposalModal from '../components/CreateProposalModal.vue';
  import ExplanationBlock from '../components/ExplanationBlock.vue';
  import YoutubeVideoModal from '../components/YoutubeVideoModal.vue';
  import SignMessageModal from '../components/SignMessageModal.vue';

  export default {
    components: {
      AeMain,
      AppHeader,
      CreateProposalModal,
      ExplanationBlock,
      YoutubeVideoModal,
      SignMessageModal,
    },
  };
</script>
