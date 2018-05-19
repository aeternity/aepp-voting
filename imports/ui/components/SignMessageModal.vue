<template>
  <ae-modal v-if="show" @close="closeHandler">
    <sign-message
      :message="message"
      :signatureHandler="signatureHandler"
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
    show: state => !!state.voting.messageToSign,
    message: state => state.voting.messageToSign &&
        state.voting.messageToSign.message,
  }),
  methods: {
    closeHandler() {
      this.$store.state.voting.messageToSign.handler(new Error('canceled-by-user'));
      this.$store.commit('voting/setMessageToSign');
    },
    signatureHandler(signature) {
      this.$store.state.voting.messageToSign.handler(undefined, signature);
      this.$store.commit('voting/setMessageToSign');
    },
  },
};
</script>
