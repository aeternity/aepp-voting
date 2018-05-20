<template>
  <ae-modal
    v-if="show"
    @close="closeHandler">
    <sign-message
      :message="message"
      :signature-handler="signatureHandler"
    />
  </ae-modal>
</template>

<script>
import { mapState } from 'vuex';
import { AeModal } from '@aeternity/aepp-components';
import SignMessage from './SignMessage.vue';

export default {
  components: {
    AeModal,
    SignMessage,
  },
  computed: mapState({
    show: state => !!state.messageToSign,
    message: state => state.messageToSign && state.messageToSign.message,
  }),
  methods: {
    closeHandler() {
      this.$store.state.messageToSign.handler(new Error('canceled-by-user'));
      this.$store.commit('setMessageToSign');
    },
    signatureHandler(signature) {
      this.$store.state.messageToSign.handler(undefined, signature);
      this.$store.commit('setMessageToSign');
    },
  },
};
</script>
