<template>
  <div class="modal">
    <div class="overlay" @click="closeHandler()"></div>
    <div class="modal-cont">
      <div class="modal-header">
        <button @click="closeHandler()">
          <i class="fa fa-close" />
        </button>
      </div>
      <div class="content"><slot /></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['closeHandler'],
  };
</script>

<style lang="scss" scoped>
  @import "/imports/voting/ui/styles/variables";

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    overflow: hidden;
    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .7);
    }
    .modal-cont {
      z-index: 1;
      width: 650px;
      background: white;
      border-radius: $base-border-radius;
      box-shadow: $base-box-shadow;
      padding: $gutter;
      @media screen and (max-width: $container-width) {
        max-width: 96vw;
      }
      .modal-header {
        button {
          float: right;
          border: 0;
          padding: 0;
          color: black;
        }
        overflow: hidden;
      }
      .content {
        margin-top: $gutter;
      }
    }
  }
</style>
