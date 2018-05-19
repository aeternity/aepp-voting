<template>
  <ae-modal
    v-if="videoId"
    @close="setYoutubeVideoId">
    <div class="youtube-video-modal">
      <iframe
        :src="`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`"
        frameborder="0"
        allowfullscreen
      />
    </div>
  </ae-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { AeModal } from '@aeternity/aepp-components';

export default {
  components: { AeModal },
  computed: mapState({
    videoId: state => state.voting.youtubeVideoId,
  }),
  methods: {
    ...mapMutations({
      setYoutubeVideoId: 'voting/setYoutubeVideoId',
    }),
  },
};
</script>

<style lang="scss" scoped>
  @import "/node_modules/@aeternity/aepp-components/dist/variables";

  .youtube-video-modal {
    margin-top: 20px;
    position: relative;
    overflow: hidden;
    max-width: 700px;

    @media (min-width: $screen-phone) {
      width: 70vw;
    }

    &::before {
      content: "";
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      padding-top: percentage(9 / 16);
    }
    &::after {
      content: "";
      clear: left;
    }

    iframe {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
</style>
