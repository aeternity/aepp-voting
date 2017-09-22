<template>
  <div>
    <app-header />
    <app-header hidden />
    <submit-proposal-modal v-if="submitProposalModalShown" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import { Proposals } from '/imports/core';
  import AppHeader from '../components/AppHeader.vue';
  import SubmitProposalModal from '../components/SubmitProposalModal.vue';

  export default {
    components: {
      AppHeader,
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
  .main-content {
    max-width: $container-width;
    margin: 0 auto;
    @media screen and (max-width: $container-width){
      padding: 10px;
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
