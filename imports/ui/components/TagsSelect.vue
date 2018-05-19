<template>
  <div class="tags-select">
    <span
      v-for="t in tags"
      :key="t">
      <input
        type="checkbox"
        :id="t"
        :value="t"
        v-model="checkedTags"
      />
      <label :for="t"><ae-badge>{{ t }}</ae-badge></label>
    </span>
  </div>
</template>

<script>
import { AeBadge } from '@aeternity/aepp-components';
import { Proposals } from '../../api/proposals/proposals';

export default {
  props: {
    value: { type: Array, default: () => [] },
  },
  components: { AeBadge },
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
  @import "/node_modules/@aeternity/aepp-components/dist/variables";

  .tags-select {
    text-align: center;
    margin: -10px;

    input {
      display: none;
    }

    label {
      display: inline-block;
      cursor: pointer;
    }

    input:not(:checked) + label > .ae-badge {
      background-color: $grey;
    }

    .ae-badge {
      height: 33px;
      line-height: 33px;
      font-size: 14px;
      min-width: 90px;
      margin: 10px;
    }
  }
</style>
