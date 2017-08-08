<template>
  <div class="proposals-filter">
    <div class="container">
      <nav>
        <button
          v-for="f in filters"
          :key="f"
          :class="{active: isActive(f)}"
          @click="setFilter(f)"
        >
          {{f}}
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filters: [
          'all',
          'popular',
          'controversial',
          'decided',
          'valid',
          'invalid',
          'newest',
          'hidden'
        ],
      };
    },
    computed: {
      currentFilter() {
        return this.$store.state.voting.filter;
      },
    },
    methods: {
      setFilter(value) {
        this.$store.commit('voting/setFilter', value);
      },
      isActive(filter) {
        return this.$store.state.voting.filter === filter;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "/imports/core/ui/styles/variables";
  @import "/imports/core/ui/styles/mixins";

  .proposals-filter {
    position: relative;
    z-index: 2;
    background: white;
    text-align: center;
    padding: 10px 0;
    box-shadow: $base-box-shadow;
    @include flex-grow(0);
    @include flex-shrink(0);
    @media screen and (max-width: $container-width) {
      padding: 10px 0 0;
    }
    &:hover {
      nav {
        button:not(.active) {
          color: $base-text-color;
        }
      }
    }
    .container {
      @media screen and (max-width: $container-width) {
        overflow-x: scroll;
        padding-bottom: 10px;
      }
    }
  }
  nav {
    white-space: nowrap;
    @media screen and (max-width: $container-width){
      padding: 0 10px;
    }
    button {
      border: 0;
      font-size: 14px;
      color: lighten($base-text-color, 50%);
      padding: 5px 15px;
      margin-right: 5px;
      font-family: $font-family-text;
      text-transform: capitalize;
      @include transition(.4s);
      &:hover {
        background: $gray-lighter;
      }
      &.active {
        background: $brand-color;
        color: white;
      }
    }
  }
</style>
