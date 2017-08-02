<template>
    <div class="list-proposals">
        <ul>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
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
        }
    data: () => ({
      proposal: '',
      proposals: [],
    }),
    created() {
      this.loadMore();
    },
    methods: {
      addProposal() {
        Meteor.call('proposals.add', this.proposal);
      },
      loadMore() {
        Meteor.call('proposals.loadMore', this.proposals.length, 10, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            this.proposals = this.proposals.concat(res);
          }
        })
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
