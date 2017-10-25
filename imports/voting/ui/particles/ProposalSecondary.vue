<template>
  <div class="proposal-secondary">
    <span>{{proposal.updatedAt | dateFormat}}</span><br/>
    <ae-category v-for="t in proposal.tags" :key="t">{{t}}</ae-category>
  </div>
</template>

<script>
  import AeCategory from '../../../components/AeCategory.vue';

  export default {
    components: { AeCategory },
    props: ['proposal'],
  }
</script>

<style lang="scss" scoped>
  @import '../../../components/variables';

  .proposal-secondary {
    margin: 10px 0;
    color: $grey;
    line-height: 25px;
    font-size: 14px;

    .ae-category {
      margin-right: 10px;
    }
  }
</style>
