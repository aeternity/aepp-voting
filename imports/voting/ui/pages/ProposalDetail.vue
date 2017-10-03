<template>
  <div class="single-proposal" v-if="proposal">
    <sign-statement
      :statement="proposal.statement"
      :currentVote="proposal.vote && proposal.vote.upVote"
      :desiredVote="vote !== 'doubt'"
      :selectedVote="vote"
      :signatureHandler="signatureHandler"
    />
    <div class="current-status" v-if="proposal.vote">
      You {{proposal.vote.upVote ? 'agreed to' : 'disagreed with'}} this statement on
      {{proposal.vote.createdAt.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    })}}
      with a voting weight of {{balance}} AE
    </div>
    <div class="comments">
      <VueDisqus
        shortname="aeternity-voting"
        :identifier="proposal._id"
        :url="disqusUrl"
      />
    </div>
    <div class="footer">
      <a :href="`/proposals/${proposal._id}`">All signatures as JSON</a>
    </div>
  </div>
  <p v-else-if="$subReady['proposal']">This statement seems to be missing.</p>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue';
  import { mapState, mapMutations } from 'vuex';

  import { Accounts } from '/imports/accounts';
  import web3 from '/imports/ethereum/ui/utils/web3';
  import { Proposals } from '../../api/models/proposals';
  import SignStatement from '../particles/SignStatement.vue';

  export default {
    props: ['id', 'vote'],
    components: {
      VueDisqus,
      SignStatement,
    },
    meteor: {
      $subscribe: {
        'proposal'() {
          return [
            this.id,
            this.$store.state.voting.accountId,
          ];
        },
        'accounts.balance'() {
          return [ this.$store.state.voting.accountId ];
        },
      },
      proposal: {
        params() {
          return {
            accountId: this.$store.state.voting.accountId,
          };
        },
        update: ({ accountId }) =>
          Proposals
            .find()
            .map(proposal => ({ ...proposal, vote: proposal.votes[accountId] }))[0],
      },
      balance () {
        const account = Accounts.findOne(this.$store.state.voting.accountId);
        return account && account.balance;
      },
    },
    computed: {
      disqusUrl() {
        return Meteor.absoluteUrl() + 'proposal/' + this.$route.params.id;
      }
    },
    methods: {
      signatureHandler({ signature, upVote }) {
        this.$store.dispatch('voting/vote', {
          proposalId: this.id, signature, upVote,
        });
      },
    },
  };
</script>

<style lang="scss">
  @import "/imports/voting/ui/styles/variables";

  .single-proposal {
    border-radius: 15px;
    max-width: $container-width;
    background: white;
    margin: 0 auto;
    overflow: hidden;
    > * {
      margin: $gutter $gutter * 2;
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
