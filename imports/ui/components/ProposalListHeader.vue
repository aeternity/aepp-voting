<template>
  <div class="proposal-list-header">
    <ae-filter-list class="desktop">
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

    <ae-filter-list class="mobile">
      <ae-filter-item
        v-for="s in sorts"
        :key="s"
        :active="currentSort === s"
        :to="{ name: 'proposal-list', params: { sort: s, tag: currentTag } }"
      >
        {{ s }}
      </ae-filter-item>
    </ae-filter-list>

    <ae-filter-list class="mobile">
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
import { AeFilterList, AeFilterItem, AeFilterSeparator } from '@aeternity/aepp-components';

import { Proposals } from '../../api/proposals/proposals';

export default {
  components: {
    AeFilterList,
    AeFilterItem,
    AeFilterSeparator,
  },
  data() {
    return {
      sorts: Object.keys(Proposals.sortTypes),
      tags: [Proposals.defaultTag, ...Proposals.tags],
    };
  },
  computed: {
    currentSort() {
      return this.$route.params.sort || Proposals.defaultSort;
    },
    currentTag() {
      return this.$route.params.tag || Proposals.defaultTag;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '/node_modules/@aeternity/aepp-components/dist/mixins';

.proposal-list-header .ae-filter-list {
  @include phone {
    &.desktop {
      display: none;
    }
  }

  @include abovePhone {
    &.mobile {
      display: none;
    }
  }
}
</style>
