<template>
  <div class="proposal-secondary">
    <span>{{ proposal.updatedAt | dateFormat }}</span><br>
    <ae-badge
      v-for="t in proposal.tags"
      :key="t">{{ t }}</ae-badge>
  </div>
</template>

<script>
import { AeBadge } from '@aeternity/aepp-components';
import { dateFormat } from '../utils/filters';

export default {
  components: { AeBadge },
  filters: { dateFormat },
  props: {
    proposal: { type: Object, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '/node_modules/@aeternity/aepp-components/dist/variables';

.proposal-secondary {
  margin: 10px 0;
  font-size: 14px;
  line-height: 25px;
  color: $grey;

  .ae-badge {
    margin-right: 10px;
  }
}
</style>
