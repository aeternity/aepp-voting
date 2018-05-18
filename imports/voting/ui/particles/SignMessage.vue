<template>
  <form class="sign-message" @submit.prevent="sign">
    <div>
      Copy this message and sign it with your Ethereum address
    </div>
    <div>
      <strong>{{message}}</strong><br/>
    </div>
    <copy-button :contentToCopy="message" />
    <label for="signature">Then paste your signature here</label>
    <input required id="signature" v-model="signature" autocomplete="off">
    <ae-button type="dramatic" size="small" uppercase>Submit</ae-button>
  </form>
</template>

<script>
  import { AeButton } from '@aeternity/aepp-components';
  import CopyButton from '../particles/CopyButton.vue';

  export default {
    components: { AeButton, CopyButton },
    props: {
      signatureHandler: { type: Function },
      message: { type: String },
    },
    data() {
      return {
        signature: '',
      };
    },
    methods: {
      sign() {
        this.signatureHandler(this.signature);
      },
    },
  };
</script>

<style lang="scss">
  @import "../../../components/variables";

  .sign-message {
    text-align: center;

    > * {
      display: block;
      margin: 12px auto;
    }

    input {
      height: 30px;
      width: 80%;
      padding: 7px;
      border-radius: 4px;
      font-size: 16px;
      border: solid 1px $grey;
      box-shadow: none;
    }
  }
</style>
