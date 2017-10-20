<template>
  <div class="single-proposal" v-if="proposal">
    <button @click="removeProposal" v-if="admin" class="remove" title="Remove this statement">
      <i class="fa fa-trash" />
    </button>
    <h2 class="statement">“{{proposal.statement}}”</h2>
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
      with a voting weight of {{balance}} Æ
    </div>
    <div class="share-link">
      <b>Share this link</b><br/>
      <span>{{proposalUrl}}</span>
      <copy-button :contentToCopy="proposalUrl" />
    </div>
    <comments :id="proposal._id" />
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
  import CopyButton from '../particles/CopyButton.vue';
  import Comments from '../components/Comments.vue';

  export default {
    props: ['id', 'vote'],
    components: {
      VueDisqus,
      SignStatement,
      CopyButton,
      Comments,
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
      ...mapState({
        admin: state => state.voting.admin,
      }),
      proposalUrl() {
        return Meteor.absoluteUrl() + 'statements/' + this.$route.params.id;
      }
    },
    methods: {
      signatureHandler({ signature, upVote }) {
        this.$store.dispatch('voting/vote', {
          proposalId: this.id, signature, upVote,
        });
      },
      removeProposal() {
        if (confirm(`Are you sure want to remove "${this.proposal.statement}" statement?`)) {
          this.$store.dispatch('voting/removeProposal', this.proposal._id);
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "/imports/voting/ui/styles/variables";

  .single-proposal {
    border-radius: $base-border-radius;
    box-shadow: $base-box-shadow;
    background: white;
    margin: $gutter 0;
    overflow: hidden;
    > * {
      margin: $gutter $gutter * 2;
    }
    button.remove {
      border: 0;
      padding: 0;
      color: black;
      float: right;
    }
    h2.statement {
      padding: 40px 0;
      text-align: center;
      font-size: 28px;
    }
    .current-status {
      color: $gray;
      text-align: center;
    }
    .share-link {
      margin-top: 80px;
      margin-bottom: 50px;
      word-break: break-all;
    }
  }
</style>
