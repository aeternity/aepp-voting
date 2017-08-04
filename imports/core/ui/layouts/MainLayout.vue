<template>
  <div class="main-layout">
    <app-header />
    <submit-proposal-modal v-if="submitProposalModalShown" />
    <modal v-if="proposalModalShown" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import { Proposals } from '/imports/core';
  import AppHeader from '../components/AppHeader.vue';
  import Modal from '../components/Modal.vue';
  import SubmitProposalModal from '../components/SubmitProposalModal.vue';
  export default {
    components: {
      AppHeader,
      Modal,
      SubmitProposalModal,
    },
    computed: {
      proposalModalShown() {
        return this.$store.state.core.proposalModalShown;
      },
      submitProposalModalShown() {
        return this.$store.state.core.submitProposalModalShown;
      }
    },
  }
</script>

<style lang="scss">
  @import "/imports/core/ui/styles/normalize";
  @import "/imports/core/ui/styles/fonts";
  @import "/imports/core/ui/styles/mixins";
  @import "/imports/core/ui/styles/variables";
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
    width: 880px;
    margin: 0 auto;
  }
  .main-layout {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @include flexbox;
    @include flex-direction(column);
    .main-content {
      position: relative;
      @include flex-grow(1);
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
