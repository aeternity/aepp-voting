<template>
  <ae-button
    v-clipboard="contentToCopy"
    :key="contentToCopy"
    @success="label = 'Copied!'"
    @error="label = 'Copy Error!'"
    type="button"
    secondary
  >
    {{label}}
  </ae-button>
</template>

<script>
  import AeButton from '../../../components/AeButton.vue';

  export default {
    props: ['contentToCopy'],
    components: { AeButton },
    data() {
      return {
        label: 'Copy',
      };
    },
  };
</script>
