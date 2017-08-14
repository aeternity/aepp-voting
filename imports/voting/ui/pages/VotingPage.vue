<template>
  <div class="voting-page page">
    <!--<proposal-filter />-->
    <proposal-list />
  </div>
</template>

<script>
  import ProposalFilter from '../components/ProposalFilter.vue';
  import ProposalList from '../components/ProposalList.vue';

  export default {
    components: {
      ProposalFilter,
      ProposalList,
    },
  }
</script>

<style lang="scss">
  .voting-page {
    display: flex;
    flex-direction: column;
  }
  .voting-content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    .container {
      position: relative;
      flex-grow: 1;
      .row-h {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        > div {
          position: relative;
        }
      }
    }
  }
</style>
