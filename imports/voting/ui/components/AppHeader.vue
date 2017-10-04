<template>
  <div :class="hidden ? 'hidden' : 'fixed'">
    <header>
      <router-link to="/">
        <img class="logo" src="/images/logo_white.png" alt="logo" />
        <div class="stripe"></div>
        <h3>Voting</h3>
      </router-link>
      <button @click="toggleCreateProposalModal">Submit statement</button>
    </header>
    <nav class="proposals-filter">
      <router-link
        v-for="f in filters"
        :key="f"
        :class="{active: currentFilter === f}"
        :to="`/sorting/${f}`"
      >
        {{f}}
      </router-link>
    </nav>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  import { Proposals } from '../../api/models/proposals';

  export default {
    props: {
      hidden: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        filters: [Proposals.filterTypes.NEWEST, Proposals.filterTypes.TOTAL_VOTES],
      };
    },
    methods: mapMutations({
      toggleCreateProposalModal: 'voting/toggleCreateProposalModal',
    }),
    computed: {
      currentFilter() {
        if (!['root', 'proposal-list'].includes(this.$route.name)) return;
        return this.$route.params.filter || Proposals.filterTypes.NEWEST;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "/imports/voting/ui/styles/variables";

  .hidden, .fixed {
    &.hidden {
      visibility: hidden;
    }
    &.fixed {
      position: fixed;
      z-index: 1;
      width: 100%;
    }
    background: $brand-color;

    header {
      margin: 0 auto;
      max-width: $container-width;
      justify-content: space-between;
      &, a {
        display: flex;
        align-items: center;
      }
      a {
        text-decoration: none;
      }
      @media screen and (max-width: $container-width){
        padding: 10px;
      }
      .logo {
        height: 40px;
      }
      .stripe {
        width: 1px;
        height: 40px;
        background: white;
        margin: $gutter;
      }
      button {
        color: white;
        border-color: white;
        &:hover {
          background: white;
          color: $brand-color;
        }
      }
      h3 {
        color: white;
        font-weight: lighter;
        letter-spacing: .1em;
      }
    }

    nav {
      background: white;
      box-shadow: $base-box-shadow;
      text-align: center;
      padding: 10px;
      a {
        text-decoration: none;
        border-radius: 100px;
        border: 0;
        font-size: 14px;
        color: lighten($base-text-color, 50%);
        padding: 5px 15px;
        margin-right: 5px;
        font-family: $font-family-text;
        text-transform: capitalize;
        transition: .4s;
        &:hover {
          background: $gray-lighter;
        }
        &.active {
          background: $brand-color;
          color: white;
        }
      }
      &:hover {
        button:not(.active) {
          color: $base-text-color;
        }
      }
    }
  }
</style>
