<template>
  <form
    class="sign-message"
    @submit.prevent="sign">
    <div>
      Copy this message and sign it with your Ethereum address
    </div>
    <div>
      <strong>{{ message }}</strong><br>
    </div>
    <copy-button :content-to-copy="message" />
    <label for="signature">Then paste your signature here</label>
    <input
      id="signature"
      v-model="signature"
      required
      autocomplete="off">
    <ae-button
      type="dramatic"
      size="small"
      uppercase>Submit</ae-button>
  </form>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components';
import CopyButton from './CopyButton.vue';

export default {
  components: { AeButton, CopyButton },
  props: {
    signatureHandler: { type: Function, required: true },
    message: { type: String, required: true },
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
@import '/node_modules/@aeternity/aepp-components/dist/variables';

.sign-message {
  text-align: center;

  > * {
    display: block;
    margin: 12px auto;
  }

  input {
    width: 80%;
    height: 30px;
    padding: 7px;
    font-size: 16px;
    border: solid 1px $grey;
    border-radius: 4px;
    box-shadow: none;
  }
}
</style>
