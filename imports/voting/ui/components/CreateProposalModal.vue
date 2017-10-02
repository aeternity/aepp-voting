<template>
  <div class="modal">
    <div class="overlay" @click="toggleCreateProposalModal"></div>
    <div class="modal-cont">
      <div class="modal-header">
        <button @click="toggleCreateProposalModal">Close</button>
      </div>
      <div class="submit-proposal">
        <h3>Please keep the statement short and simple, e. g. "God exists".</h3>
        <sign-statement :showCopy="false" :signatureHandler="signatureHandler" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  import SignStatement from '../particles/SignStatement.vue';

  export default {
    components: {
      SignStatement,
    },
    methods: {
      ...mapMutations({
        toggleCreateProposalModal: 'voting/toggleCreateProposalModal',
      }),
      signatureHandler({ statement, signature, upVote }) {
        this.$store.dispatch('voting/createProposal', { statement, signature, upVote })
          .then(proposalId => this.$router.push(`/proposal/${proposalId}`));
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "/imports/voting/ui/styles/variables";

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    overflow: hidden;
    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .7);
    }
    .modal-cont {
      z-index: 1;
      width: 650px;
      background: white;
      border-radius: $base-border-radius;
      box-shadow: $base-box-shadow;
      @media screen and (max-width: $container-width) {
        max-width: 96vw;
      }
      .modal-header {
        padding: $gutter $gutter * 2;
        button {
          float: right;
          border: 0;
          padding: 0;
        }
      }
      .submit-proposal {
        text-align: center;
        > input {
          margin: $gutter auto;
          height: 30px;
          width: 80%;
          padding: 15px;
          border-radius: 5px;
          border: solid 1px #eaeaea;
          box-shadow: none;
          display: block;
        }
        > div {
          margin: $gutter;
        }
      }
    }
  }
</style>
