<template>
  <div>
    <div class="statement">
      <h2>
        <template v-if="statement">"{{statement}}"</template>
        <template v-else>
          <input
            v-focus="true"
            v-autosize
            v-model="newStatement"
            placeholder="Your statement"
          />
        </template>
      </h2>
      <button
        class="btn-copy"
        v-clipboard="statement"
        @success="onCopied"
        @error="onCopyError"
      >Copy</button>
    </div>
    <div class="voting-buttons" v-if="canSignByWeb3">
      <button
        class="up-vote"
        :class="{ already: currentVote }"
        @click="voteByWeb3(true)"
      >
        I agree
      </button>
      <button
        class="down-vote"
        :class="{ already: currentVote === false }"
        @click="voteByWeb3(false)"
      >
        I disagree
      </button>
    </div>
    <div class="voting-section" :class="upVote ? 'agree' : 'doubt'" v-else>
      <div class="tab-header">
        <button class="agree" :class="{ active: upVote }" @click="setUpVote(true)">
          I agree
        </button>
        <button class="doubt" :class="{ active: !upVote }" @click="setUpVote(false)">
          I disagree
        </button>
      </div>
      <form @submit.prevent="vote" class="tab">
        <h5>Please copy the above statement, sign it with your Ethereum address, and paste signature here</h5>
        <input type="text" v-model="signature" placeholder="Place signature here">
        <button>Submit</button>
      </form>
    </div>
    <h5>Share this link</h5>
    <span>{{`http://voting.aepps.com/proposal/${proposalId}`}}</span>
    <button
      class="btn-copy"
      v-clipboard="`http://voting.aepps.com/proposal/${proposalId}`"
      @success="onCopied"
      @error="onCopyError"
    >Copy</button>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { focus } from 'vue-focus';

  import { Accounts } from '/imports/accounts';
  import web3 from '/imports/ethereum/ui/utils/web3';
  import { Proposals } from '../../api/models/proposals';

  export default {
    directives: { focus },
    props: {
      currentVote: { type: Boolean, default: undefined },
      desiredVote: { type: Boolean, default: true },
      signatureHandler: { type: Function },
      statement: { type: String },
      proposalId: { type: String },
    },
    data() {
      return {
        signature: '',
        canSignByWeb3: !!(web3.currentProvider && web3.eth.accounts[0]),
        upVote: this.desiredVote,
        newStatement: '',
      }
    },
    methods: {
      onCopyError(e) {
        e.trigger.innerHTML = 'Copy Error!'
      },
      onCopied(e) {
        e.trigger.innerHTML = 'Copied'
      },
      setUpVote(upVote) {
        this.upVote = upVote;
      },
      vote() {
        if (!this.signature) return;
        this.signatureHandler({
          statement: this.statement || this.newStatement,
          signature: this.signature,
          upVote: this.upVote,
        });
      },
      voteByWeb3(upVote) {
        const statement = this.statement || this.newStatement;
        if (!statement) return;
        const { eth: { accounts }, personal: { sign }, toHex } = web3;
        const decision = `I ${upVote ? '' : 'dis'}agree that ${statement}`;
        sign(toHex(decision), accounts[0], (error, signature) => {
          if (error) this.$store.dispatch('handleError', { error, upVote });
          else this.signatureHandler({ statement, signature, upVote });
        });
      },
    },
  };
</script>

<style lang="scss">
  @import "/imports/voting/ui/styles/variables";

  .statement {
    position: relative;
    padding: 70px;
    h2 {
      position: relative;
      text-align: center;
      font-size: 28px;
      margin: 0;
      input {
        border: none;
        &:placeholder-shown {
          min-width: 200px;
        }
      }
    }
    .btn-copy {
      border: none;
      margin: 0 auto;
      display: block;
      text-decoration: underline;
      color: $gray;
    }
  }
  .voting-buttons {
    text-align: center;
    margin-bottom: $gutter * 2;
    @media screen and (max-width: $screen-sm) {
      margin-top: $gutter;
    }
    button {
      margin: $gutter;
      font-size: 28px;
      padding: $gutter $gutter * 4;
      @media screen and (max-width: $screen-sm) {
        width: 100%;
        margin: $gutter 0;
      }
    }
  }
  .voting-section {
    &.doubt {
      .tab {
        background: $red !important;
        button {
          color: $red;
          border: 2px solid $red;
          &:hover {
            border-color: lighten($red, 20%);
            color: lighten($red, 20%);
          }
        }
      }
    }
    .tab-header {
      position: relative;
      top: 1px;
      text-align: center;
      button {
        font-size: 28px;
        padding: 10px 30px;
        border-radius: $base-border-radius $base-border-radius 0 0;
        border-width: 0;
        &.doubt {
          color: $red;
          border-color: $red;
        }
        &.agree {
          color: $green;
          border-color: $green;
        }
        &.active {
          border-width: 1px;
          background: $green;
          color: white;
          &.doubt {
            background: $red;
          }
        }
      }
    }
    .tab {
      border-radius: $base-border-radius;
      padding: $gutter * 2 $gutter * 2 $gutter;
      background: $green !important;
      text-align: center;
      h5 {
        font-family: $font-family-accent;
        font-style: italic;
        text-align: center;
        font-size: 14px;
        margin: $gutter;
        color: white;
      }
      input {
        display: block;
        font-size: 18px;
        padding: 10px;
        font-family: 'Roboto Light';
        color: $gray;
        border: 2px solid white;
        border-radius: $base-border-radius;
        width: 90%;
        margin: 0 auto;
        background: white;
        &::placeholder {
          color: $gray-lighter;
        }
      }
      button {
        background: white;
        color: $green;
        margin: 30px 0 13px 0;
        font-size: 24px;
        padding: 5px 70px;
        border: 2px solid $green;
        &:hover {
          border-color: $gray-lighter;
          color: lighten($green, 20%);
        }
      }
    }
  }
</style>
