<template>
  <modal v-if="show" :closeHandler="closeHandler">
    <sign-message
      :message="message"
      :signatureHandler="signatureHandler"
    />
  </modal>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  import Modal from '../particles/Modal.vue';
  import SignMessage from '../particles/SignMessage.vue';

  export default {
    components: {
      Modal,
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
