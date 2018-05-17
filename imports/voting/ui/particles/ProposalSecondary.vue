<template>
  <div class="proposal-secondary">
    <span>{{proposal.updatedAt | dateFormat}}</span><br/>
    <ae-badge v-for="t in proposal.tags" :key="t">{{t}}</ae-badge>
  </div>
</template>

<script>
  import { AeBadge } from '@aeternity/aepp-components';

  export default {
    components: { AeBadge },
    props: ['proposal'],
  };
</script>

<style lang="scss" scoped>
  @import '../../../components/variables';

  .proposal-secondary {
    margin: 10px 0;
    color: $grey;
    line-height: 25px;
    font-size: 14px;

    .ae-badge {
      margin-right: 10px;
    }
  }
</style>
