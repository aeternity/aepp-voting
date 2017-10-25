<template>
  <button class="ae-close-button" @click="click">
    <i class="fa" />
  </button>
</template>

<script>
  export default {
    methods: {
      click(e) {
        this.$emit('click', e);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .ae-close-button {
    border: 0;
    padding: 0;
    font-size: 40px;
    background: transparent;
    width: 20px;
    height: 20px;

    i {
      margin-top: -10px;
      display: block;
      &:before {
        content: '\00d7';
      }
    }
  }
</style>
