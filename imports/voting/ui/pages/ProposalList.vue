<template>
  <div>
    <proposal-item
      v-for="p in proposals"
      :key="p._id"
      :proposal="p"
    ></proposal-item>
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
  import Vue from 'vue';
  import { mapMutations } from 'vuex';
  import { Counts } from 'meteor/tmeasday:publish-counts';
  import MugenScroll from 'vue-mugen-scroll'

  import { Proposals } from '/imports/core';
  import ProposalItem from '../particles/ProposalItem.vue';

  export default {
    components: {
      ProposalItem,
      MugenScroll,
    },
    computed: {
      gotMore() {
        return this.proposals.length < this.proposalsCount
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
        'proposals.list'() {
          return [
            this.$route.params.filter || Proposals.filterTypes.NEWEST,
            this.$store.state.voting.limit,
            this.$store.state.core.accountId,
          ];
        },
        'proposals.count': [],
      },
      proposals: {
        params() {
          return {
            filter: this.$store.state.voting.filter,
            accountId: this.$store.state.core.accountId,
          };
        },
        update: ({ filter, accountId }) =>
          Proposals
            .find({}, { sort: Proposals.filterSort[filter] || { createdAt: -1 } })
            .map(proposal => ({ ...proposal, vote: proposal.votes[accountId] })),
      },
      proposalsCount () {
        return Counts.get('proposals');
      }
    },
    methods: mapMutations({
      loadMore: 'voting/incrementLimit',
    }),
  }
</script>

<style lang="scss" scoped>
  @import "/imports/core/ui/styles/variables";

  .mugen-scroll, .all-loaded {
    text-align: center;
    padding-bottom: 10px;
    color: $gray-light;
    font-family: $font-family-header;
  }
</style>
