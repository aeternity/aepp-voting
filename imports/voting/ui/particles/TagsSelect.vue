<template>
  <div class="tags-select">
    <div>Choose one or multiple categories</div>
    <span v-for="t in tags" :key="t">
      <input
        type="checkbox"
        :id="t"
        :value="t"
        v-model="checkedTags"
      />
      <label :for="t"><badge>{{t}}</badge></label>
    </span>
  </div>
</template>

<script>
  import { Proposals } from '../../api/models/proposals';
  import Badge from './Badge.vue';

  export default {
    props: {
      value: { type: Array, default: () => [] },
    },
    components: { Badge },
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
  @import "/imports/voting/ui/styles/variables";

  .tags-select {
    text-align: center;
    margin: $gutter * 2;

    div {
      margin-bottom: $gutter;
    }

    input {
      display: none;
    }

    label {
      display: inline-block;
      margin: 5px 0;
      cursor: pointer;
    }

    input:not(:checked) + label > * {
      background-color: gray;
    }
  }
</style>
