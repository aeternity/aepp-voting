<template>
    <div class="list-proposals">
        <ul>
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
          return [this.$store.state.voting.filter];
        }
      },
      proposals () {
        return Proposals.find();
      },
    },
    data: () => ({
      proposal: '',
    }),
    methods: {
      addProposal() {
        Meteor.call('proposals.add', this.proposal);
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