<template>
  <div class="vote-button">
    <button :class="{ active }" @click="click" :id="_uid">
      <slot />
    </button>
    <label :for="_uid">{{label}}</label>
  </div>
</template>

<script>
  export default {
    props: {
      active: { type: Boolean, default: false },
      label: String,
    },
    methods: {
      click(e) {
        this.$emit('click', e);
      },
    },
  };
</script>

<style lang="scss">
  @import '../../../components/variables';

  .vote-button {
    button {
      width: 80px;
      height: 80px;
      line-height: 80px;
      background-color: $silver;
      border-radius: 40px;
      border: none;
      color: #f5b826;
      font-size: 30px;

      &.active, &:hover {
        background-color: $maegenta;
      }
    }

    label {
      cursor: pointer;
      margin-top: 9px;
      font-size: 16px;
      display: block;
      text-align: center;
      color: $aubergine;
    }
  }
</style>
