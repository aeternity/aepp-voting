<template>
  <div class="main-layout">
    <app-header />
    <submit-proposal-modal v-if="submitProposalModalShown" />
    <proposal-modal
      v-if="!!proposal"
      :proposal="proposal"
    />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import { Proposals } from '/imports/core';
  import AppHeader from '../components/AppHeader.vue';
  // import ProposalModal from '../components/ProposalModal.vue';
  import SubmitProposalModal from '../components/SubmitProposalModal.vue';

  export default {
    components: {
      AppHeader,
      // ProposalModal,
      SubmitProposalModal,
    },
    computed: mapState({
      proposal: state => state.voting.proposal,
      submitProposalModalShown: state => state.core.submitProposalModalShown,
    }),
  }
</script>

<style lang="scss">
  @import "/imports/core/ui/styles/normalize";
  @import "/imports/core/ui/styles/fonts";
  @import "/imports/core/ui/styles/variables";
  @import "/imports/core/ui/styles/vote-button";
  * {
    outline: none !important;
    -webkit-font-smoothing: antialiased;
  }
  body {
    background: $gray-lighter;
    font-family: $font-family-text;
    color: $base-text-color;
  }
  .container {
    width: 100%;
    max-width: $container-width;
    margin: 0 auto;
  }
  .main-layout {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .main-content {
      position: relative;
      flex-grow: 1;
      padding: 10px;
      .page {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
  button {
    background-color: transparent;
    border: 1px solid $brand-color;
    color: $brand-color;
    border-radius: 100px;
    padding: 5px 20px;
    cursor: pointer;
    font-family: $font-family-header;
  }
</style>
