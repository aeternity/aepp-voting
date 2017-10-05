<template>
  <form class="sign-statement" @submit.prevent="vote">
    <div class="buttons">
      <button
        class="vote"
        :class="{
          already: currentVote,
          checked: !canSignByWeb3 && upVote
        }"
        @click="setUpVote(true)"
      >
        <i class="fa fa-thumbs-up" /> I agree
      </button>
      <button
        class="vote"
        :class="{
          already: currentVote === false,
          checked: !canSignByWeb3 && !upVote
        }"
        @click="setUpVote(false)"
      >
        <i class="fa fa-thumbs-down" /> I disagree
      </button>
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
  import { focus } from 'vue-focus';

  import { Accounts } from '/imports/accounts';
  import web3 from '/imports/ethereum/ui/utils/web3';
  import { Proposals } from '../../api/models/proposals';
  import CopyButton from '../particles/CopyButton.vue';

  export default {
    components: { CopyButton },
    directives: { focus },
    props: {
      currentVote: { type: Boolean, default: undefined },
      desiredVote: { type: Boolean, default: true },
      signatureHandler: { type: Function },
      statement: { type: String },
    },
    data() {
      return {
        signature: '',
        canSignByWeb3: !!(web3.currentProvider && web3.eth.accounts[0]),
        upVote: this.desiredVote,
      }
    },
    methods: {
      setUpVote(upVote) {
        this.upVote = upVote;
        if (this.canSignByWeb3) {
          const statement = this.statement;
          if (!statement) return;
          const { eth: { accounts }, personal: { sign }, toHex } = web3;
          sign(toHex(this.messageToSign), accounts[0], (error, signature) => {
            if (error) this.$store.dispatch('handleError', { error, upVote });
            else this.signatureHandler({ statement, signature, upVote });
          });
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
      messageToSign() {
        return `I ${this.upVote ? '' : 'dis'}agree that ${this.statement}`;
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
      font-size: 24px;
      border: solid 1px $gray-light;
      box-shadow: none;
    }
  }
</style>
