<template>
  <modal :closeHandler="setYoutubeVideoId">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </modal>
</template>

<script>
  import { mapMutations } from 'vuex';

  import Modal from '../particles/Modal.vue';

  export default {
    props: ['videoId'],
    components: { Modal },
    methods: {
      ...mapMutations({
        setYoutubeVideoId: 'voting/setYoutubeVideoId',
      }),
    },
  };
</script>

<style lang="scss" scoped>
  iframe {
    width: 100%;
    min-height: 365px;
  }
</style>
