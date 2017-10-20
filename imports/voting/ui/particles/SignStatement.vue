<template>
  <div class="sign-statement">
    <div class="buttons">
      <div>
        <button
          class="vote"
          :class="{
            already: currentVote,
            checked: !canSignByWeb3 && upVote
          }"
          @click="setUpVote(true)"
          :id="`${_uid}-agree`"
        >
          <i class="fa fa-thumbs-up" />
        </button>
        <label :for="`${_uid}-agree`">I agree</label>
      </div>
      <div>
        <button
          class="vote"
          :class="{
            already: currentVote === false,
            checked: !canSignByWeb3 && !upVote
          }"
          @click="setUpVote(false)"
          :id="`${_uid}-disagree`"
        >
          <i class="fa fa-thumbs-down" />
        </button>
        <label :for="`${_uid}-disagree`">I disagree</label>
      </div>
    </div>
    <sign-message
      v-if="!canSignByWeb3"
      :message="messageToSign"
      :signatureHandler="this.vote"
    />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  import { Accounts } from '/imports/accounts';
  import { Proposals } from '../../api/models/proposals';
  import CopyButton from '../particles/CopyButton.vue';
  import { voteStatement } from '/imports/ethereum/api/utils/genStatement';
  import SignMessage from './SignMessage.vue';

  export default {
    components: { CopyButton, SignMessage },
    props: {
      currentVote: { type: Boolean, default: undefined },
      desiredVote: { type: Boolean, default: true },
      signatureHandler: { type: Function },
      statement: { type: String },
    },
    data() {
      return {
        signature: '',
        upVote: this.desiredVote,
      }
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
  @import "/imports/voting/ui/styles/variables";

  .sign-statement {
    > * {
      display: block;
      margin: $gutter auto;
    }

    button.vote {
      font-size: 24px;
      padding: $gutter 40px;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: $gutter * 3 auto;

      &::before, &::after {
        content: '';
      }

      label {
        display: block;
        text-align: center;
        margin-top: 8px;
        cursor: pointer;
      }

      .vote {
        width: 85px;
        height: 85px;
        line-height: 85px;
        padding: 0;
      }
    }

    .sign-message {
      margin-top: 60px;
    }
  }
</style>
