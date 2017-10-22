<template>
  <form class="sign-message" @submit.prevent="sign">
    <div class="center">
      Copy this message and sign it with your Ethereum address:
    </div>
    <div class="center">
      <strong>{{message}}</strong><br/>
      <copy-button :contentToCopy="message"></copy-button>
    </div>
    <label class="center" for="signature">Then paste your signature here</label>
    <input required id="signature" v-model="signature" autocomplete="off">
    <button class="vote">Submit</button>
  </form>
</template>

<script>
  import CopyButton from '../particles/CopyButton.vue';

  export default {
    components: { CopyButton },
    props: {
      signatureHandler: { type: Function },
      message: { type: String },
    },
    data() {
      return {
        signature: '',
      }
    },
    methods: {
      sign() {
        this.signatureHandler(this.signature);
      },
    },
  };
</script>

<style lang="scss">
  @import "/imports/voting/ui/styles/variables";

  .sign-message {
    > * {
      display: block;
      margin: $gutter auto;
    }

    button.vote {
      font-size: 24px;
      padding: $gutter 40px;
    }

    .center {
      text-align: center;
    }

    input {
      height: 30px;
      width: 80%;
      padding: 7px;
      border-radius: 4px;
      font-size: 16px;
      border: solid 1px $gray-light;
      box-shadow: none;
    }
  }
</style>
