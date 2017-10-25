<template>
  <div>
    <ae-header name="Voting">
      <ae-header-button
        icon
        @click="toggleAuth"
        :title="loggedIn ? 'Logout' : 'Login'"
      >
        <i :class="`fa fa-sign-${loggedIn ? 'out' : 'in'}`" />
      </ae-header-button>
      <ae-header-button
        icon
        @click="toggleExplanationBlock"
      >
        <i class="fa fa-question" />
      </ae-header-button>
      <ae-header-button @click="toggleCreateProposalModal">
        <i class="fa fa-pencil" /> Create New
      </ae-header-button>

      <ae-header-button
        slot="mobile-left"
        icon
        @click="toggleExplanationBlock"
      >
        <i class="fa fa-question" />
      </ae-header-button>
      <ae-header-button
        slot="mobile-right"
        icon
        @click="toggleCreateProposalModal"
      >
        <i class="fa fa-pencil" />
      </ae-header-button>
    </ae-header>
    <ae-filter-list v-if="proposalList">
      <ae-filter-item
        v-for="s in sorts"
        :key="s"
        :active="currentSort === s"
        :to="{ name: 'proposal-list', params: { sort: s, tag: currentTag } }"
      >
        {{s}}
      </ae-filter-item>
      <ae-filter-separator />
      <ae-filter-item
        v-for="t in tags"
        :key="t"
        :active="currentTag === t"
        :to="{ name: 'proposal-list', params: { sort: currentSort, tag: t } }"
      >
        {{t}}
      </ae-filter-item>
    </ae-filter-list>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';

  import AeHeader from '../../../components/AeHeader.vue';
  import AeHeaderButton from '../../../components/AeHeaderButton.vue';
  import AeFilterList from '../../../components/AeFilterList.vue';
  import AeFilterItem from '../../../components/AeFilterItem.vue';
  import AeFilterSeparator from '../../../components/AeFilterSeparator.vue';

  import { Proposals } from '../../api/models/proposals';

  export default {
    props: {
      hidden: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      AeHeader, AeHeaderButton,
      AeFilterList, AeFilterItem, AeFilterSeparator,
    },
    data() {
      return {
        sorts: Object.keys(Proposals.sortTypes),
        tags: [Proposals.defaultTag, ...Proposals.tags],
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
        loggedIn: state => state.voting.loggedIn,
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
  }
</script>
