<template>
    <div class="list-proposals" ref="wrap">
        <ul>
            <proposal-item
                    v-for="p in proposals"
                    :key="p._id"
                    :proposal="p"
            ></proposal-item>
            <mugen-scroll
                    :handler="loadMore"
                    :should-handle="!loading"
                    scroll-container="wrap"
            >
                loading...
              </mugen-scroll>
        </ul>
    </div>
</template>

<script>
  import Vue from 'vue';
  import MugenScroll from 'vue-mugen-scroll'

  import { Proposals } from '/imports/core';
  import ProposalItem from '../particles/ProposalItem.vue';

  export default {
    components: {
      ProposalItem,
      MugenScroll,
    },
    computed: {
      loading() {
        return false;
      }
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
    methods: {
      loadMore: function() {
        console.log('loading more');
        this.$store.commit('voting/incrementLimit');
      }
    },
  }
</script>

<style lang="scss" scoped>
    @import "/imports/core/ui/styles/variables";
    @import "/imports/core/ui/styles/mixins";

    .list-proposals {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
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
