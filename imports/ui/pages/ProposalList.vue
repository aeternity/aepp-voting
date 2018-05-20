<template>
  <div>
    <proposal-item
      v-for="p in proposals"
      :key="p._id"
      :proposal="p"
    />
    <mugen-scroll
      v-if="gotMore"
      :handler="loadMore"
      :should-handle="!loading"
    >
      <i class="fa fa-spinner fa-spin" /> Loading
    </mugen-scroll>
    <div
      v-if="!gotMore"
      class="all-loaded"
    >
      All loaded
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Counts } from 'meteor/tmeasday:publish-counts';
import MugenScroll from 'vue-mugen-scroll';
import { Proposals } from '../../api/proposals/proposals';
import ProposalItem from '../components/ProposalItem.vue';

export default {
  components: {
    ProposalItem,
    MugenScroll,
  },
  props: {
    sort: { type: String, default: Proposals.defaultSort },
    tag: { type: String, default: Proposals.defaultTag },
  },
  computed: {
    gotMore() {
      return this.proposals.length < this.proposalsCount;
    },
    loaded() {
      return this.proposalsCount;
    },
    loading() {
      return false;
    },
  },
  meteor: {
    $subscribe: {
      'proposals.list': function proposalsList() {
        return [
          this.sort,
          this.tag,
          this.$store.state.voting.limit,
          this.$store.state.voting.accountId,
        ];
      },
      'proposals.count': [],
    },
    proposals: {
      params() {
        return {
          sort: this.sort,
          tag: this.tag,
          accountId: this.$store.state.voting.accountId,
        };
      },
      update: ({ sort, tag, accountId }) =>
        Proposals
          .find({
            ...tag === Proposals.defaultTag ? {} : { tags: tag },
          }, { sort: Proposals.sortTypes[sort] })
          .map(proposal => ({ ...proposal, vote: proposal.votes[accountId] })),
    },
    proposalsCount() {
      return Counts.get('proposals');
    },
  },
  methods: mapMutations({
    loadMore: 'voting/incrementLimit',
  }),
};
</script>

<style lang="scss" scoped>
@import "/node_modules/@aeternity/aepp-components/dist/variables";

.mugen-scroll,
.all-loaded {
  padding-bottom: 10px;
  color: $grey;
  text-align: center;
}
</style>
