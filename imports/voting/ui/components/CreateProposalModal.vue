<template>
  <div class="modal">
    <div class="overlay" @click="toggleCreateProposalModal"></div>
    <div class="modal-cont">
      <div class="modal-header">
        <button @click="toggleCreateProposalModal">
          <i class="fa fa-close" />
        </button>
      </div>
      <div class="submit-proposal">
        <h3>
          Enter your statement and agree or disagree
          <span>(please keep it short)</span>
        </h3>
        <label for="statement">Your statement</label>
        <input id="statement" placeholder="Saturdays are great" v-model="statement" />
        <sign-statement
          :statement="statement || 'Saturdays are great'"
          :signatureHandler="signatureHandler"
        ></sign-statement>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  import SignStatement from '../particles/SignStatement.vue';

  export default {
    data() {
      return { statement: '' };
    },
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
      padding: $gutter;
      @media screen and (max-width: $container-width) {
        max-width: 96vw;
      }
      .modal-header {
        button {
          float: right;
          border: 0;
          padding: 0;
          color: black;
        }
      }
      .submit-proposal {
        h3 {
          text-align: center;
          margin-bottom: $gutter * 3;
          span {
            display: block;
            font-weight: normal;
            font-size: 0.9em;
          }
        }
        > label, > input {
          margin: $gutter auto;
          width: 80%;
          display: block;
        }
        > input {
          height: 30px;
          padding: 7px;
          border-radius: 4px;
          font-size: 24px;
          border: solid 1px $gray-light;
          box-shadow: none;
        }
      }
    }
  }
</style>
