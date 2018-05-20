<template>
  <div class="vote-button">
    <button
      :class="{ active }"
      :id="_uid"
      @click="click">
      <slot />
    </button>
    <label :for="_uid">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false },
    label: { type: String, required: true },
  },
  methods: {
    click(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss">
@import "/node_modules/@aeternity/aepp-components/dist/variables";

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

    &.active,
    &:hover {
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
