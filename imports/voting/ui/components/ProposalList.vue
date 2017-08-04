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
                <i class="fa fa-spinner fa-spin" /> loading
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
          ];
        },
        'proposals.count': [],
      },
      proposals () {
        return Proposals.find();
      },
      proposalsCount () {
        return Counts.get('proposals');
      }
    },
    methods: {
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
        @include transform(translateZ(0));
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
    .mugen-scroll, .all-loaded {
        text-align: center;
        padding-bottom: 10px;
        text-transform: uppercase;
        color: $gray-light;
        font-family: $font-family-header;
    }
</style>
