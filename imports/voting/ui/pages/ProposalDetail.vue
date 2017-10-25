<template>
  <ae-panel
    :ratio="ratio"
    v-if="proposal"
    :closeHandler="close"
  >
    <div class="proposal-detail">
      <h2>{{proposal.statement}}</h2>
      <proposal-secondary :proposal="proposal" />
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
      <div class="space-around admin-panel" v-if="admin">
        Admin
        <tags-select :value="proposal.tags" @input="updateTags" />
        <div>
          <ae-button @click="removeProposal" class="remove" title="Remove this statement">
            <i class="fa fa-trash" /> Delete
          </ae-button>
        </div>
      </div>
      <div class="space-around share-link">
        <h3>Share this link</h3>
        <span>{{proposalUrl}}</span>
        <copy-button :contentToCopy="proposalUrl" />
      </div>
      <comments class="space-around" :id="proposal._id" />
    </div>
  </ae-panel>
  <p v-else-if="$subReady['proposal']">This statement seems to be missing.</p>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  import AePanel from '../../../components/AePanel.vue';
  import AeCloseButton from '../../../components/AeCloseButton.vue';
  import AeButton from '../../../components/AeButton.vue';

  import { Accounts } from '/imports/accounts';
  import web3 from '/imports/ethereum/ui/utils/web3';
  import { Proposals } from '../../api/models/proposals';
  import SignStatement from '../particles/SignStatement.vue';
  import CopyButton from '../particles/CopyButton.vue';
  import Comments from '../components/Comments.vue';
  import TagsSelect from '../particles/TagsSelect.vue';
  import ProposalSecondary from '../particles/ProposalSecondary.vue';

  export default {
    props: ['id', 'vote'],
    components: {
      AePanel,
      AeCloseButton,
      AeButton,
      SignStatement,
      CopyButton,
      Comments,
      TagsSelect,
      ProposalSecondary,
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
      },
      ratio() {
        return this.proposal.upVoteAmount / this.proposal.totalVoteAmount;
      },
    },
    methods: {
      close() {
        this.$router.push(this.$store.state.route.from.path);
      },
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

<style lang="scss" scoped>
  @import '../../../components/variables';

  .proposal-detail {
    clear: right;
    padding: 0 110px;
    overflow: hidden;

    > * {
      margin: 12px 0;
    }
    h2 {
      margin-top: 12px;
      margin-bottom: 16px;
      text-align: center;
      font-size: 34px;
      line-height: 50px;
      font-weight: 500;
    }
    .proposal-secondary {
      text-align: center;
      margin-bottom: 46px;
    }
    .current-status {
      color: $grey;
      text-align: center;
    }

    .admin-panel {
      border: 1px solid $grey;
      border-radius: 5px;
      color: $grey;
      font-size: 14px;
      padding: 15px;

      .ae-button {
        margin: 0 auto;
      }

      > div {
        margin: 10px;
        text-align: center;
      }
    }

    .share-link {
      word-break: break-all;
      span {
        line-height: 30px;
        margin-right: 30px;
      }
    }

    @media (max-width: $container-width) {
      padding: 0 55px;
    }

    @media (max-width: $screen-phone) {
      padding: 0;

      h2 {
        font-size: 28px;
        line-height: normal;
      }
    }
  }
</style>

<style lang="scss">
  @import '../../../components/variables';

  .proposal-detail {
    .space-around {
      margin-top: 60px;
      margin-bottom: 60px;
      h3 {
        margin: 0;
        font-size: 25px;
        font-weight: 500;
        @media (max-width: $screen-phone) {
          font-size: 21px;
        }
      }
    }
  }
</style>
