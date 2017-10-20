<template>
  <div :class="hidden ? 'hidden' : 'fixed'">
    <header>
      <router-link to="/">
        <img class="logo" src="/images/logo_white.png" alt="logo" />
        <div class="stripe"></div>
        <h3>Voting</h3>
      </router-link>
      <div>
        <button
          v-if="showLoginButton || loggedIn"
          :title="loggedIn ? 'Logout' : 'Login as admin'"
          @click="toggleAuth"
          class="icon"
        >
          <i class="fa" :class="`fa-sign-${loggedIn ? 'out' : 'in'}`" />
        </button>
        <button @click="toggleExplanationBlock" class="icon">
          <i class="fa fa-info" />
        </button>
        <button @click="toggleCreateProposalModal" class="primary icon-mobile">
          <i class="fa fa-pencil" />
          <span class="hidden-mobile">Submit statement</span>
        </button>
      </div>
    </header>
    <nav>
      <router-link
        v-for="s in sorts"
        :key="s"
        :class="{active: currentSort === s}"
        :to="`/sorting/${s}`"
      >
        {{s}}
      </router-link>
    </nav>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';

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
        sorts: Object.keys(Proposals.sortTypes),
      };
    },
    methods: {
      ...mapMutations({
        toggleCreateProposalModal: 'voting/toggleCreateProposalModal',
        toggleExplanationBlock: 'voting/toggleExplanationBlock',
      }),
      ...mapActions({
        toggleAuth: 'voting/toggleAuth',
      }),
    },
    computed: {
      ...mapState({
        showLoginButton: ({ voting: { possibleAdmin, canSignByWeb3 } }) =>
          possibleAdmin && canSignByWeb3,
        loggedIn: state => state.voting.loggedIn,
      }),
      currentSort() {
        if (!['root', 'proposal-list'].includes(this.$route.name)) return;
        return this.$route.params.sort || Proposals.defaultSort;
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
        margin-left: $gutter;
        &, &.primary:hover {
          background-color: transparent;
          color: white;
          border-color: white;
        }
        &:hover, &.primary {
          background: white;
          color: $brand-color;
        }
        i {
          margin-right: 5px;
        }
        @mixin icon {
          width: 31px;
          height: 31px;
          line-height: 31px;
          text-align: center;
          padding: 0;
          i {
            margin-right: 0;
          }
        }
        &.icon {
          @include icon;
        }
        @media screen and (max-width: $container-width){
          .hidden-mobile {
            display: none;
          }
          &.icon-mobile {
            @include icon;
          }
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
