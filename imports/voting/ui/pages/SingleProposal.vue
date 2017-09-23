<template>
  <div>
    <div class="single-proposal" v-if="proposal">
      <router-link to="/">
        <i class="fa fa-fw fa-chevron-left" />To proposals
      </router-link>
      <div class="statement">
        <div class="quote left">
          <i class="fa fa-quote-left" />
        </div>
        <h2>
          <template v-if="!canSignByWeb3">
            I {{proposalType === 'agree' ? '' : 'dis'}}agree that
          </template>
          {{proposal.statement}}
        </h2>
        <div class="quote right">
          <i class="fa fa-quote-right" />
        </div>
      </div>
      <div class="voting-buttons" v-if="canSignByWeb3">
        <button class="up-vote" :class="isVotedClass(true)" @click="voteByWeb3(true)">
          I agree
        </button>
        <button class="down-vote" :class="isVotedClass(false)" @click="voteByWeb3(false)">
          I disagree
        </button>
      </div>
      <div class="voting-section" :class="proposalType" v-else>
        <div class="tab-header">
          <button
            class="agree"
            :class="{active: proposalType === 'agree'}"
            @click="setProposalType('agree')"
          >
            I agree
          </button>
          <button
            class="doubt"
            :class="{active: proposalType === 'doubt'}"
            @click="setProposalType('doubt')"
          >
            I disagree
          </button>
        </div>
        <form @submit.prevent="vote" class="tab">
          <h5>Please copy the above statement, sign it with your Ethereum address, and paste signature here</h5>
          <input type="text" v-model="signature" placeholder="Place signature here">
          <button>Submit</button>
        </form>
      </div>
      <div class="current-status" v-if="proposal.vote">
        You {{proposal.vote.upVote ? 'agreed to' : 'disagreed with'}} this proposal on
        {{proposal.vote.createdAt.toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        })}}
        with a voting weight of {{balance}} AE
      </div>
      <div class="comments">
        <VueDisqus
          shortname="aeternity-voting"
          :identifier="proposal._id"
          :url="url"></VueDisqus>
      </div>
      <div class="footer">
        <a :href="`/proposals/${proposal._id}`">All signatures as JSON</a>
      </div>
    </div>
    <p v-if="this.$subReady['proposal'] && !proposal">This proposal seems to be missing.</p>
  </div>
</template>

<script>
  import { Proposals } from '/imports/core'
  import { mapState, mapMutations } from 'vuex'
  import VueDisqus from 'vue-disqus/VueDisqus'

  export default {
    components: {
      VueDisqus,
    },
    data() {
      return {
        signature: '',
        canSignByWeb3: window.web3 && window.web3.eth.defaultAccount,
      }
    },
    computed: {
      ...mapState({
        proposalType: state => state.voting.proposalType,
      }),
      url() {
        return Meteor.absoluteUrl() + 'proposal/' + this.$route.params.id;
      }
    },
    methods: {
      ...mapMutations({
        agreeOrDoubtProposal: 'voting/agreeOrDoubtProposal',
        setProposalType: 'voting/setProposalType',
      }),
      isVotedClass(upVote) {
        return this.proposal.vote && this.proposal.vote.upVote === upVote ? 'already' : '';
      },
      vote() {
        if (this.signature) {
          this.$store.dispatch('voting/vote', this.signature);
        }
      },
      voteByWeb3(upVote) {
        this.$store.commit('voting/setProposalType', upVote ? 'agree' : 'doubt');
        this.$store.dispatch('voting/voteByWeb3');
      },
    },
    meteor: {
      $subscribe: {
        'proposal'() {
          return [
            this.$route.params.id,
            this.$store.state.core.accountId,
          ];
        },
      },
      proposal () {
        return Proposals.findOne()
      }
    },
  }
</script>

<style lang="scss">
  @import "/imports/core/ui/styles/variables";
  .single-proposal {
    border-radius: 15px;
    padding: 15px;
    max-width: 880px;
    background: white;
    margin: 0 auto;
    > a {
      float: right;
      font-size: 20px;
      font-weight: bold;
      color: black;
      cursor: pointer;
      text-decoration: none;
    }
    .statement {
      margin-top: 30px;
      position: relative;
      padding: 50px 70px;
      h2 {
        position: relative;
        text-align: center;
        font-size: 28px;
        z-index: 2;
        margin: 0;
      }
      .quote {
        position: absolute;
        font-size: 70px;
        color: $gray-lighter;
        z-index: 1;
        &.left {
          top: 0;
          left: 30px;
        }
        &.right {
          bottom: 0;
          right: 30px;
        }
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
          background: $red;
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
        z-index: 2;
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
        background: $green;
        text-align: center;
        h5 {
          font-family: $font-family-accent;
          text-align: center;
          font-size: 14px;
          margin: $gutter;
          color: white;
        }
        input {
          display: block;
          font-size: 22px;
          padding: 10px;
          font-family: 'Roboto Light';
          color: white;
          border: 2px solid white;
          border-radius: $base-border-radius;
          width: 90%;
          margin: 0 auto;
          background: transparent;
          &::placeholder {
            color: rgba(255, 255, 255, .7);
            opacity: 1;
          }
        }
        button {
          background: white;
          color: $green;
          margin: 10px;
          font-size: 24px;
          padding: 5px 70px;
          border: 2px solid $green;
          &:hover {
            border-color: lighten($green, 20%);
            color: lighten($green, 20%);
          }
        }
      }
    }
    .current-status {
      color: $gray;
      text-align: center;
    }
    .footer {
      text-align: right;
      a {
        color: $brand-color;
      }
    }
  }
</style>
