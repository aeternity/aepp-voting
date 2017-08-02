<template>
    <li class="proposal-item">
        <h3>Proposal name: {{proposal.title}}</h3>
        <p>04/01/1989</p>
    </li>
</template>

<script>
  export default {
    props: ['proposal'],
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

    .proposal-item {
        position: relative;
        background: white;
        border-radius: $base-border-radius;
        margin-bottom: $gutter;
        box-shadow: $base-box-shadow;
        padding: $gutter;
        padding-left: $gutter * 2;
        text-transform: uppercase;
        &:after {
            content: "";
            display: block;
            position: absolute;
            width: 5px;
            left: 0;
            top: 0;
            height: 100%;
            border-top-left-radius: $base-border-radius;
            border-bottom-left-radius: $base-border-radius;
            background: $green;
        }
    }

    h3, p {
        margin: 0;
    }

    p {
        font-family: $font-family-accent;
        color: $gray-light;
        font-size: 14px;
    }
</style>