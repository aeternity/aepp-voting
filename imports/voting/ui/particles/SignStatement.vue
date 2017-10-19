<template>
  <form class="sign-statement" @submit.prevent="vote">
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
    <template v-if="!canSignByWeb3">
      <div class="center first">
        Copy this message and sign it with your Ethereum address:
      </div>
      <div class="center">
        <strong>{{messageToSign}}</strong><br/>
        <copy-button :contentToCopy="messageToSign"></copy-button>
      </div>
      <label class="center" for="signature">Then paste your signature here</label>
      <input id="signature" v-model="signature">
      <button class="vote">Submit</button>
    </template>
  </form>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  import { Accounts } from '/imports/accounts';
  import { Proposals } from '../../api/models/proposals';
  import CopyButton from '../particles/CopyButton.vue';
  import { voteStatement } from '/imports/ethereum/api/utils/genStatement';

  export default {
    components: { CopyButton },
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
              statement: this.statement,
              signature: await this.$store.dispatch('voting/signMessage', this.messageToSign),
              upVote,
            });
          } catch (error) {
            this.$store.dispatch('voting/handleError', { error, upVote });
          }
        }
      },
      vote() {
        if (!this.signature) return;
        this.signatureHandler({
          statement: this.statement,
          signature: this.signature,
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

    .first {
      margin-top: 60px;
    }

    .center {
      text-align: center;
    }

    input {
      height: 30px;
      width: 80%;
      padding: 7px;
      border-radius: 4px;
      font-size: 16px;
      border: solid 1px $gray-light;
      box-shadow: none;
    }
  }
</style>
