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
@import '/node_modules/@aeternity/aepp-components/dist/variables';

.youtube-video-modal {
  position: relative;
  max-width: 700px;
  margin-top: 20px;
  overflow: hidden;

  @media (min-width: $screen-phone) {
    width: 70vw;
  }

  &::before {
    float: left;
    width: 1px;
    height: 0;
    padding-top: percentage(9 / 16);
    margin-left: -1px;
    content: '';
  }

  &::after {
    clear: left;
    content: '';
  }

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
