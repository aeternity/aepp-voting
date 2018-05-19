<template>
  <div class="sign-statement">
    <div class="buttons">
      <vote-button
        label="I agree"
        @click="setUpVote(true)"
        :active="currentVote || !canSignByWeb3 && upVote"
      >
        <i class="fa fa-thumbs-up" />
      </vote-button>
      <vote-button
        label="I disagree"
        @click="setUpVote(false)"
        :active="currentVote === false || !canSignByWeb3 && !upVote"
      >
        <i class="fa fa-thumbs-down" />
      </vote-button>
    </div>
    <sign-message
      v-if="!canSignByWeb3"
      :message="messageToSign"
      :signature-handler="this.vote"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { voteStatement } from '../../api/utils/genStatement';
import CopyButton from './CopyButton.vue';
import SignMessage from './SignMessage.vue';
import VoteButton from './VoteButton.vue';

export default {
  components: { CopyButton, SignMessage, VoteButton },
  props: {
    currentVote: { type: Boolean, default: undefined },
    desiredVote: { type: Boolean, default: true },
    signatureHandler: { type: Function, required: true },
    statement: { type: String, required: true },
  },
  data() {
    return {
      signature: '',
      upVote: this.desiredVote,
    };
  },
  methods: {
    async setUpVote(upVote) {
      this.upVote = upVote;
      if (this.canSignByWeb3 && this.statement) {
        try {
          this.signatureHandler({
            signature: await this.$store.dispatch('voting/signMessage', this.messageToSign),
            upVote,
          });
        } catch (error) {
          this.$store.dispatch('voting/handleError', { error, upVote });
        }
      }
    },
    vote(signature) {
      this.signatureHandler({
        signature,
        upVote: this.upVote,
      });
    },
  },
  computed: {
    ...mapState({
      accountId: state => state.voting.accountId,
      canSignByWeb3: state => state.voting.canSignByWeb3,
    }),
    messageToSign() {
      return voteStatement(this.upVote, this.statement);
    },
  },
};
</script>

<style lang="scss">
  .sign-statement {
    > * {
      display: block;
      margin: 12px auto;
    }

    button.vote {
      font-size: 24px;
      padding: 12px 40px;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .vote-button {
        margin: 0 22px;
      }
    }

    .sign-message {
      margin-top: 60px;
    }
  }
</style>
