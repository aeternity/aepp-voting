<template>
  <ae-button
    class="copy-button"
    v-clipboard="contentToCopy"
    :key="contentToCopy"
    @success="label = 'Copied!'"
    @error="label = 'Copy Error!'"
    size="small"
    uppercase
  >
    {{label}}
  </ae-button>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components';

export default {
  props: ['contentToCopy'],
  components: { AeButton },
  data() {
    return {
      label: 'Copy',
    };
  },
  mounted() {
    this.$el.setAttribute('type', 'button');
  },
};
</script>

<style lang="scss" scoped>
  @import "/node_modules/@aeternity/aepp-components/dist/variables";

  .copy-button {
    color: $white;
  }
</style>
