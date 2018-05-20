<template>
  <div class="app-header">
    <ae-header name="Voting">
      <ae-button
        type="dramatic"
        @click="toggleExplanationBlock">
        <ae-icon
          slot="icon"
          invert
          type="dramatic"
          name="info" />
      </ae-button>
      <ae-button
        type="dramatic"
        @click="toggleCreateProposalModal">
        <ae-icon
          slot="icon"
          invert
          type="dramatic"
          name="plus" /> Create New
      </ae-button>
      <ae-button @click="toggleAuth">
        {{ loggedIn ? 'Log out' : 'Log in' }}
      </ae-button>

      <ae-button
        slot="mobile-left"
        type="dramatic"
        @click="toggleExplanationBlock"
      >
        <ae-icon
          slot="icon"
          invert
          type="dramatic"
          name="info" />
      </ae-button>
      <ae-button
        slot="mobile-right"
        type="dramatic"
        @click="toggleCreateProposalModal"
      >
        <ae-icon
          slot="icon"
          invert
          type="dramatic"
          name="plus" />
      </ae-button>
    </ae-header>

    <ae-banner v-if="alert">
      {{ alert }}
      <ae-button
        slot="right"
        plain
        size="small"
        @click="closeAlert">
        <ae-icon
          slot="icon"
          name="close" />
      </ae-button>
    </ae-banner>

    <ae-filter-list
      v-if="proposalList"
      class="desktop">
      <ae-filter-item
        v-for="s in sorts"
        :key="s"
        :active="currentSort === s"
        :to="{ name: 'proposal-list', params: { sort: s, tag: currentTag } }"
      >
        {{ s }}
      </ae-filter-item>
      <ae-filter-separator />
      <ae-filter-item
        v-for="t in tags"
        :key="t"
        :active="currentTag === t"
        :to="{ name: 'proposal-list', params: { sort: currentSort, tag: t } }"
      >
        {{ t }}
      </ae-filter-item>
    </ae-filter-list>

    <ae-filter-list
      v-if="proposalList"
      class="mobile">
      <ae-filter-item
        v-for="s in sorts"
        :key="s"
        :active="currentSort === s"
        :to="{ name: 'proposal-list', params: { sort: s, tag: currentTag } }"
      >
        {{ s }}
      </ae-filter-item>
    </ae-filter-list>

    <ae-filter-list
      v-if="proposalList"
      class="mobile">
      <ae-filter-item
        v-for="t in tags"
        :key="t"
        :active="currentTag === t"
        :to="{ name: 'proposal-list', params: { sort: currentSort, tag: t } }"
      >
        {{ t }}
      </ae-filter-item>
    </ae-filter-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  AeHeader,
  AeBanner, AeButton, AeIcon,
  AeFilterList, AeFilterItem, AeFilterSeparator,
} from '@aeternity/aepp-components';

import { Proposals } from '../../api/proposals/proposals';

export default {
  components: {
    AeHeader,
    AeBanner,
    AeButton,
    AeIcon,
    AeFilterList,
    AeFilterItem,
    AeFilterSeparator,
  },
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sorts: Object.keys(Proposals.sortTypes),
      tags: [Proposals.defaultTag, ...Proposals.tags],
    };
  },
  computed: {
    ...mapState({
      loggedIn: state => state.voting.loggedIn,
      alert: state => state.voting.alert,
    }),
    proposalList() {
      return this.$route.name === 'proposal-list';
    },
    currentSort() {
      return this.$route.params.sort || Proposals.defaultSort;
    },
    currentTag() {
      return this.$route.params.tag || Proposals.defaultTag;
    },
  },
  methods: {
    ...mapMutations({
      toggleCreateProposalModal: 'voting/toggleCreateProposalModal',
      toggleExplanationBlock: 'voting/toggleExplanationBlock',
    }),
    closeAlert() {
      this.$store.commit('voting/setAlert');
    },
    ...mapActions({
      toggleAuth: 'voting/toggleAuth',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "/node_modules/@aeternity/aepp-components/dist/variables";

.app-header {
  .ae-header .ae-button {
    margin-left: 10px;
    vertical-align: middle;

    &._has-label_false .ae-icon {
      margin: 4px;
    }

    &._type_normal {
      color: $white;
    }
  }

  .ae-banner {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }

  .ae-filter-list {
    @media (max-width: $screen-phone) {
      &.desktop {
        display: none;
      }
    }

    @media (min-width: $screen-phone + 1) {
      &.mobile {
        display: none;
      }
    }
  }
}
</style>
