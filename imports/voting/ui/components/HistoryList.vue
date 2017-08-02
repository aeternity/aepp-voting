<template>
    <div id="history">
        <p>this is history list block (do we need that?)</p>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        editedTodo: null,
      };
    },
    methods: {
      removeTodo(todo) {
        console.log('yo');
      },
    },
  }
</script>

<style lang="scss" scoped>
    @import '/imports/core/ui/styles/variables';

    #history {
        margin-top: $gutter;
        background: white;
        padding: $gutter;
        box-shadow: $base-box-shadow;
        border-radius: $base-border-radius;
    }
</style>