<template>
  <ae-button
    v-clipboard="contentToCopy"
    :key="contentToCopy"
    class="copy-button"
    size="small"
    uppercase
    @success="label = 'Copied!'"
    @error="label = 'Copy Error!'"
  >
    {{ label }}
  </ae-button>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components';

export default {
  components: { AeButton },
  props: {
    contentToCopy: { type: String, required: true },
  },
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
