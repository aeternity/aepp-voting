<template>
  <header>
    <div class="container">
      <img class="logo" src="/images/logo_white.png" alt="logo" />
      <div class="stripe"></div>
      <h3>Voting</h3>
      <button @click="toggleSubmitProposalModal">Submit proposal</button>
    </div>
  </header>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    methods: mapMutations({
      toggleSubmitProposalModal: 'core/toggleSubmitProposalModal',
    }),
  }
</script>

<style lang="scss" scoped>
  @import "/imports/core/ui/styles/variables";

  header {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    background: $brand-color;
    @media screen and (max-width: $container-width){
      padding: 10px;
    }
    .logo {
      height: 40px;
    }
    .container {
      display: flex;
      align-items: center;
    }
  }
  .stripe {
    width: 1px;
    height: 40px;
    background: white;
    margin: $gutter;
  }
  button {
    color: white;
    border-color: white;
    &:hover {
      background: white;
      color: $brand-color;
    }
  }
  h3 {
    color: white;
    font-family: 'Roboto Light';
    letter-spacing: .1em;
    flex-grow: 1;
  }
</style>
