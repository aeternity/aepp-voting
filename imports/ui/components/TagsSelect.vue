<template>
  <div class="tags-select">
    <span
      v-for="t in tags"
      :key="t">
      <input
        :id="t"
        :value="t"
        v-model="checkedTags"
        type="checkbox"
      >
      <label :for="t"><ae-badge>{{ t }}</ae-badge></label>
    </span>
  </div>
</template>

<script>
import { AeBadge } from '@aeternity/aepp-components';
import { Proposals } from '../../api/proposals/proposals';

export default {
  components: { AeBadge },
  props: {
    value: { type: Array, default: () => [] },
  },
  data() {
    return {
      tags: Proposals.tags,
    };
  },
  computed: {
    checkedTags: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '/node_modules/@aeternity/aepp-components/dist/variables';

.tags-select {
  margin: -10px;
  text-align: center;

  input {
    display: none;
  }

  label {
    display: inline-block;
    cursor: pointer;
  }

  .ae-badge {
    min-width: 90px;
    height: 33px;
    margin: 10px;
    font-size: 14px;
    line-height: 33px;
  }

  input:not(:checked) + label > .ae-badge {
    background-color: $grey;
  }
}
</style>
