<template>
    <div class="list-proposals">
        <ul>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <proposal-item
              v-for="p in proposals"
              :key="p._id"
              :proposal="p"
            ></proposal-item>
          </div>
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
    'proposals.list'() {
      return [this.$store.state.voting.filter];
    },
    created() {
      this.handler = this.$subscribe('proposals.list', this.limit);
    },
    meteor: {
      $subscribe: {
        'proposals.list': []
      },
      proposals () {
        return Proposals.find();
      },
    },
    data: () => ({
      proposal: '',
      limit: 0,
      loading: false,
      handler: null,
    }),
    methods: {
      addProposal() {
        Meteor.call('proposals.add', this.proposal);
      },
      loadMore: function() {
        this.loading = true;
        setTimeout(() => {
          this.limit += 10;
          this.handler.stop();
          this.handler = this.$subscribe('proposals.list', this.limit);
          this.loading = false;
        }, 1000);
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
    }
</style>
