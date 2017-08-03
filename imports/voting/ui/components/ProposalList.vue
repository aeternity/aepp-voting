<template>
    <div class="list-proposals">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <proposal-item
          v-for="p in proposals"
          :key="p._id"
          :proposal="p"
        ></proposal-item>
      </ul>
    </div>
</template>

<script>
  import Vue from 'vue';

  import { Proposals } from '/imports/core';
  import ProposalItem from '../particles/ProposalItem.vue';

  export default {
    components: {
      ProposalItem,
    },
    meteor: {
      $subscribe: {
        'proposals.list'() {
          return [
            this.$store.state.voting.filter,
            this.$store.state.voting.limit,
          ];
        },
      },
      proposals () {
        return Proposals.find();
      },
    },
    data: () => ({
      loading: false,
    }),
    methods: {
      addProposal() {
        Meteor.call('proposals.add', this.proposal);
      },
      loadMore: function() {
        this.$store.commit('voting/incrementLimit');
      }
    },
  }
</script>

<style lang="scss" scoped>
    @import "/imports/core/ui/styles/variables";
    @import "/imports/core/ui/styles/mixins";

    .list-proposals {
        @include flexbox;
        @include flex-direction(column);
        @include flex-grow(1);
        overflow-y: scroll;
    }
    ul {
        list-style: none;
        padding: 0;
        padding-top: $gutter;
        margin: 0;
        @include transform(translateZ(0));
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
</style>
