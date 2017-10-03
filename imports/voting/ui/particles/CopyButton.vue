<template>
  <button
    v-clipboard="contentToCopy"
    :key="contentToCopy"
    @success="label = 'Copied!'"
    @error="label = 'Copy Error!'"
    type="button"
  >
    {{label}}
  </button>
</template>

<script>
  export default {
    props: ['contentToCopy'],
    data() {
      return {
        label: 'Copy',
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "/imports/voting/ui/styles/variables";

  button {
    border: none;
    text-decoration: underline;
    color: $gray;
  }
</style>
