<template>
    <div id="history">
        <ul>
          <li v-for="news in $store.state.voting.newsList">
            <a target="_blank" :href="news.url">{{ news.title }}</a>
          </li>
        </ul>
    </div>
</template>

<script>
  import getJSONData from 'get-json-data';

  export default {
    created() {
      this.fetchNewsList();
    },
    data() {
      return {
        editedTodo: null,
      };
    },
    methods: {
      removeTodo(todo) {
        console.log('yo');
      },
      fetchNewsList() {
        this.$store.dispatch('voting/fetchNewsList');
      }
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
        > ul {
          padding: 0;
          list-style-type: none;
          > li {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.8;
            > a {
              color: $brand-color;
            }
            > a:hover {
              color: darken($brand-color, 20)
            }
          }
        }
    }
</style>
