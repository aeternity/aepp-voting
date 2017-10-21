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
    <tags-select v-if="admin" :value="proposal.tags" @input="updateTags" />
    <div class="space-around share-link">
      <h3>Share this link</h3>
      <span>{{proposalUrl}}</span>
      <copy-button :contentToCopy="proposalUrl" />
    </div>
    <comments class="space-around" :id="proposal._id" />
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
  import TagsSelect from '../particles/TagsSelect.vue';

  export default {
    props: ['id', 'vote'],
    components: {
      VueDisqus,
      SignStatement,
      CopyButton,
      Comments,
      TagsSelect,
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
          Meteor.call('proposals.remove', this.proposal._id);
        }
      },
      updateTags(tags) {
        Meteor.call('proposals.updateTags', this.proposal._id, tags);
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
    .space-around {
      margin-top: 60px;
      margin-bottom: 60px;
      h3 {
        margin: 0;
      }
    }
    .share-link {
      word-break: break-all;
    }
  }
</style>
