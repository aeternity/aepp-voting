<template>
  <ae-modal
    v-if="visible"
    title="Create statement"
    @close="closeHandler">
    <div class="create-proposal-modal">
      <label :for="_uid">Statement</label>
      <input
        placeholder="Enter a short statement text ..."
        v-model="statement"
        :id="_uid"
        v-focus.lazy="true"
      >

      <p>Choose one or multiple categories</p>
      <tags-select v-model="tags" />

      <p>Agree or disagree and sign your vote</p>
      <sign-statement
        :statement="statement"
        :signature-handler="signatureHandler"
      />
    </div>
  </ae-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { focus } from 'vue-focus';
import { AeModal } from '@aeternity/aepp-components';
import SignStatement from './SignStatement.vue';
import TagsSelect from './TagsSelect.vue';

export default {
  data() {
    return {
      statement: '',
      tags: [],
    };
  },
  components: {
    AeModal,
    SignStatement,
    TagsSelect,
  },
  directives: { focus },
  computed: mapState({
    visible: state => state.voting.createProposalModalShown,
  }),
  methods: {
    ...mapMutations({
      closeHandler: 'voting/toggleCreateProposalModal',
    }),
    async signatureHandler({ signature, upVote }) {
      await this.$store.dispatch('voting/createProposal', {
        statement: this.statement,
        signature,
        upVote,
        tags: this.tags,
      });
      this.$router.push({
        name: 'proposal-list',
        params: { sort: 'newest' },
      });
    },
  },
};
</script>

<style lang="scss">
  @import "/node_modules/@aeternity/aepp-components/dist/variables";

  .create-proposal-modal {
    > * {
      margin: 15px 0;
    }

    label, p, .sign-message > div:first-child, .sign-message > label {
      font-weight: 500;
    }

    p, .sign-message > div:first-child, .sign-message > label {
      margin-top: 50px;
      text-align: left;
    }

    > label, > input {
      display: block;
    }
    > input, .sign-message > input {
      height: 44px;
      padding: 7px;
      border-radius: 4px;
      font-size: 24px;
      border: solid 1px $grey;
      box-shadow: none;
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
