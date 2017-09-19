<template>
  <div class="list-proposals" ref="wrap">
    <ul class="container">
      <proposal-item
        v-for="p in proposals"
        :key="p._id"
        :proposal="p"
      ></proposal-item>
      <mugen-scroll
        v-if="gotMore"
        :handler="loadMore"
        :should-handle="!loading"
        scroll-container="wrap"
      >
        <i class="fa fa-spinner fa-spin" /> Loading
      </mugen-scroll>
      <div
        v-if="!gotMore"
        class="all-loaded"
      >
        All loaded
      </div>
    </ul>
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
        console.log(this.proposals.length);
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
            this.$store.state.voting.filter,
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

  .list-proposals {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: scroll;
    @media screen and (max-width: $container-width){
      padding: 10px;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    padding-top: $gutter;
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .mugen-scroll, .all-loaded {
    text-align: center;
    padding-bottom: 10px;
    color: $gray-light;
    font-family: $font-family-header;
  }
</style>
