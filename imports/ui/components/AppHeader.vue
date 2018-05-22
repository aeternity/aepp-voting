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
        @click="() => setAlert()">
        <ae-icon
          slot="icon"
          name="close" />
      </ae-button>
    </ae-banner>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { AeHeader, AeBanner, AeButton, AeIcon } from '@aeternity/aepp-components';

import { Proposals } from '../../api/proposals/proposals';

export default {
  components: {
    AeHeader,
    AeBanner,
    AeButton,
    AeIcon,
  },
  data() {
    return {
      sorts: Object.keys(Proposals.sortTypes),
      tags: [Proposals.defaultTag, ...Proposals.tags],
    };
  },
  computed: mapState(['loggedIn', 'alert']),
  methods: {
    ...mapMutations(['toggleCreateProposalModal', 'toggleExplanationBlock', 'setAlert']),
    ...mapActions(['toggleAuth']),
  },
};
</script>

<style lang="scss" scoped>
@import '/node_modules/@aeternity/aepp-components/dist/variables';

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
}
</style>
