<template>
  <ae-panel
    v-if="proposal"
    :ratio-top="ratio"
    :close-handler="close"
  >
    <div class="proposal-detail">
      <h2>{{ proposal.statement }}</h2>
      <proposal-secondary :proposal="proposal" />
      <sign-statement
        :statement="proposal.statement"
        :current-vote="proposal.vote && proposal.vote.upVote"
        :desired-vote="vote !== 'doubt'"
        :selected-vote="vote"
        :signature-handler="signatureHandler"
      />
      <div
        v-if="proposal.vote"
        class="current-status">
        You {{ proposal.vote.upVote ? 'agreed to' : 'disagreed with' }} this statement on
        {{ proposal.vote.createdAt.toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        }) }}
        with a voting weight of {{ balance }} Æ
      </div>
      <div
        v-if="admin"
        class="space-around admin-panel">
        Admin
        <tags-select
          :value="proposal.tags"
          @input="updateTags" />
        <div>
          <ae-button
            type="dramatic"
            size="small"
            uppercase
            title="Remove this statement"
            @click="removeProposal"
          >
            <ae-icon
              slot="icon"
              invert
              type="dramatic"
              name="close" /> Delete
          </ae-button>
        </div>
      </div>
      <div class="space-around share-link">
        <h3>Share this link</h3>
        <span>{{ proposalUrl }}</span>
        <copy-button :content-to-copy="proposalUrl" />
      </div>
      <comments
        :id="proposal._id"
        class="space-around" />
    </div>
  </ae-panel>
  <p v-else-if="$subReady['proposal']">This statement seems to be missing.</p>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import { mapState } from 'vuex';
import { AePanel, AeButton, AeIcon } from '@aeternity/aepp-components';
import { Accounts } from '../../api/accounts/accounts';
import { Proposals } from '../../api/proposals/proposals';
import SignStatement from '../components/SignStatement.vue';
import CopyButton from '../components/CopyButton.vue';
import Comments from '../components/Comments.vue';
import TagsSelect from '../components/TagsSelect.vue';
import ProposalSecondary from '../components/ProposalSecondary.vue';

export default {
  components: {
    AePanel,
    AeButton,
    AeIcon,
    SignStatement,
    CopyButton,
    Comments,
    TagsSelect,
    ProposalSecondary,
  },
  props: {
    id: { type: String, required: true },
    vote: { type: String, default: '' },
  },
  meteor: {
    $subscribe: {
      proposal() {
        return [
          this.id,
          this.$store.state.accountId,
        ];
      },
      'accounts.balance': function accountsBalance() {
        return [this.$store.state.accountId];
      },
    },
    proposal: {
      params() {
        return {
          accountId: this.$store.state.accountId,
        };
      },
      update: ({ accountId }) =>
        Proposals
          .find()
          .map(proposal => ({ ...proposal, vote: proposal.votes[accountId] }))[0],
    },
    balance() {
      const account = Accounts.findOne(this.$store.state.accountId);
      return account && account.balance;
    },
  },
  computed: {
    ...mapState(['admin']),
    proposalUrl() {
      return `${Meteor.absoluteUrl()}statements/${this.$route.params.id}`;
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
      this.$store.dispatch('vote', {
        proposalId: this.id, signature, upVote,
      });
    },
    removeProposal() {
      // eslint-disable-next-line no-restricted-globals, no-alert
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
@import '/node_modules/@aeternity/aepp-components/dist/variables';

.proposal-detail {
  padding: 0 110px;
  overflow: hidden;
  clear: right;

  > * {
    margin: 12px 0;
  }

  h2 {
    margin-top: 12px;
    margin-bottom: 16px;
    font-size: 34px;
    font-weight: 500;
    line-height: 50px;
    text-align: center;
  }

  .proposal-secondary {
    margin-bottom: 46px;
    text-align: center;
  }

  .current-status {
    color: $grey;
    text-align: center;
  }

  .space-around {
    margin-top: 60px;
    margin-bottom: 60px;

    /deep/ h3 {
      margin: 0;
      font-size: 25px;
      font-weight: 500;

      @media (max-width: $screen-phone) {
        font-size: 21px;
      }
    }
  }

  .admin-panel {
    padding: 15px;
    font-size: 14px;
    color: $grey;
    border: 1px solid $grey;
    border-radius: 5px;

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
      margin-right: 30px;
      line-height: 30px;
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
