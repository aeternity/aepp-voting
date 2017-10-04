<template>
  <div>
    <app-header />
    <app-header hidden />
    <create-proposal-modal v-if="createProposalModalShown" />
    <youtube-video-modal v-if="youtubeVideoId" :videoId="youtubeVideoId" />
    <div class="main-content">
      <explanation-block :display="explanationBlockShown" />
      <router-view />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import { Proposals } from '../../api/models/proposals';
  import AppHeader from '../components/AppHeader.vue';
  import CreateProposalModal from '../components/CreateProposalModal.vue';
  import ExplanationBlock from '../components/ExplanationBlock.vue';
  import YoutubeVideoModal from '../components/YoutubeVideoModal.vue';

  export default {
    components: {
      AppHeader,
      CreateProposalModal,
      ExplanationBlock,
      YoutubeVideoModal,
    },
    computed: mapState({
      proposal: state => state.voting.proposal,
      createProposalModalShown: state => state.voting.createProposalModalShown,
      explanationBlockShown: state => state.voting.explanationBlockShown,
      youtubeVideoId: state => state.voting.youtubeVideoId,
    }),
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
  @import "/imports/voting/ui/styles/normalize";
  @import "/imports/voting/ui/styles/variables";
  * {
    outline: none !important;
    -webkit-font-smoothing: antialiased;
  }
  body {
    background: $gray-lighter;
    font-family: $font-family-text;
    color: $base-text-color;
  }
  .main-content {
    max-width: $container-width;
    margin: 0 auto;
    padding-top: 10px;
    @media screen and (max-width: $container-width){
      padding: 10px;
    }
  }
  button, .button {
    background-color: transparent;
    border: 1px solid $brand-color;
    color: $brand-color;
    font-weight: bold;
    border-radius: 100px;
    padding: 5px 20px;
    cursor: pointer;
    font-family: $font-family-header;
    text-align: center;
    &.vote {
      color: gray;
      border: solid 2px $gray-light;
      &.already {
        background-color: $gray-lighter;
      }
      &.checked, &:hover {
        background-color: $gray-light;
      }
    }
  }
</style>
