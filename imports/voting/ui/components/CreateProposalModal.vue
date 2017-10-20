<template>
  <modal :closeHandler="toggleCreateProposalModal">
    <div class="submit-proposal">
      <h3>
        Enter your statement and agree or disagree
        <span>(please keep it short)</span>
      </h3>
      <input placeholder="Your statement" v-model="statement" v-focus="true" />
      <sign-statement
        :statement="statement"
        :signatureHandler="signatureHandler"
      ></sign-statement>
    </div>
  </modal>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { focus } from 'vue-focus';

  import Modal from '../particles/Modal.vue';
  import SignStatement from '../particles/SignStatement.vue';
  import { Proposals } from '../../api/models/proposals';

  export default {
    data() {
      return { statement: '' };
    },
    components: {
      Modal,
      SignStatement,
    },
    directives: { focus },
    methods: {
      ...mapMutations({
        toggleCreateProposalModal: 'voting/toggleCreateProposalModal',
      }),
      async signatureHandler({ signature, upVote }) {
        await this.$store.dispatch('voting/createProposal', {
          statement: this.statement,
          signature,
          upVote,
        });
        this.$router.push({
          name: 'proposal-list',
          params: { sort: 'newest' },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "/imports/voting/ui/styles/variables";

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
</style>
