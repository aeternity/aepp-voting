<template>
  <div class="main-layout">
    <app-header />
    <SubmitProposalModal v-if="submitProposalModalShown" />
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
        console.log(2);
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
    width: $screen-md;
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
  .row-h {
    @include flexbox;
    >.column {
      padding: 0 $gutter / 2;
      @include flex-shrink(0);
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
      &.md-1 {
        width: 10%;
      }
      &.md-2 {
        width: 20%;
      }
      &.md-3 {
        width: 30%;
      }
      &.md-4 {
        width: 40%;
      }
      &.md-5 {
        width: 50%;
      }
      &.md-6 {
        width: 60%;
      }
      &.md-7 {
        width: 70%;
      }
      &.md-8 {
        width: 80%;
      }
      &.md-9 {
        width: 90%;
      }
      &.md-10 {
        width: 100%;
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
