<template>
  <div>
    <proposal-item
      v-for="p in proposals"
      :key="p._id"
      :proposal="p"
    />
    <mugen-scroll
      :handler="() => limit += 10"
      :should-handle="canLoadMore"
    >
      <i
        v-if="!allLoaded"
        class="fa fa-spinner fa-spin"
      />
      {{ allLoaded ? 'All loaded' : 'Loading' }}
    </mugen-scroll>
  </div>
</template>

<script>
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
  data: () => ({
    limit: 10,
  }),
  computed: {
    canLoadMore() {
      return this.$subReady['proposals.list'] && this.proposals.length === this.limit;
    },
    allLoaded() {
      return this.$subReady['proposals.list'] && this.proposals.length !== this.limit;
    },
  },
  meteor: {
    $subscribe: {
      'proposals.list': function proposalsList() {
        return [
          this.sort,
          this.tag,
          this.limit,
          this.$store.state.accountId,
        ];
      },
    },
    proposals: {
      params() {
        return {
          sort: this.sort,
          tag: this.tag,
          accountId: this.$store.state.accountId,
        };
      },
      update: ({ sort, tag, accountId }) =>
        Proposals
          .find({
            ...tag === Proposals.defaultTag ? {} : { tags: tag },
          }, { sort: Proposals.sortTypes[sort] })
          .map(proposal => ({ ...proposal, vote: proposal.votes[accountId] })),
    },
  },
};
</script>

<style lang="scss" scoped>
@import '/node_modules/@aeternity/aepp-components/dist/variables';

.mugen-scroll {
  padding-bottom: 10px;
  color: $grey;
  text-align: center;
}
</style>
