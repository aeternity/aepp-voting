<template>
  <span class="label"><slot /></span>
</template>

<style lang="scss" scoped>
  @import "/imports/voting/ui/styles/variables";

  .label {
    display: inline-block;
    background-color: $brand-color;
    min-width: 60px;
    height: 20px;
    margin: 0 5px;
    padding: 0 10px;
    line-height: 20px;
    border-radius: 5px;
    color: white;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
  }
</style>
