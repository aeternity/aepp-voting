<template>
  <transition name="slide">
    <ae-panel
      v-if="!display"
      :close-handler="closeHandler"
      title="How to sign your vote"
    >
      <div class="explanation-block">
        <div
          v-for="video in videos"
          :key="video.youtubeId"
          :style="getVideoStyle(video.thumbnailUrl)"
          @click="setYoutubeVideoId(video.youtubeId)"
        >
          <div>{{ video.title }}</div>
          <i class="fa fa-play" />
        </div>
      </div>
    </ae-panel>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { AePanel } from '@aeternity/aepp-components';

export default {
  components: { AePanel },
  data() {
    return {
      videos: [{
        title: 'With your wallet',
        youtubeId: 'a6cTTcUePAc',
        thumbnailUrl: '/images/sign-with-wallet.jpg',
      }, {
        title: 'With Metamask',
        youtubeId: 'bwaDtur-SI0',
        thumbnailUrl: '/images/sign-with-metamask.jpg',
      }],
    };
  },
  computed: mapState({
    display: state => state.voting.explanationBlockShown,
  }),
  methods: {
    ...mapMutations({
      closeHandler: 'voting/toggleExplanationBlock',
      setYoutubeVideoId: 'voting/setYoutubeVideoId',
    }),
    getVideoStyle: url => ({ backgroundImage: `url(${url})` }),
  },
};
</script>

<style lang="scss" scoped>
@import '/node_modules/@aeternity/aepp-components/dist/variables';

.ae-panel {
  &.slide- {
    &enter-active,
    &leave-active {
      max-height: 600px;
      transition: max-height 0.3s, opacity 0.5s, margin-bottom 0.5s;
    }

    &enter,
    &leave-to {
      max-height: 0;
      margin-bottom: -20px;
      opacity: 0;
    }
  }
}

$lightGray: #d3d3d3;

.explanation-block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  > * {
    position: relative;
    box-sizing: border-box;
    flex-grow: 1;
    margin-left: 30px;
    font-size: 1.2em;
    cursor: pointer;
    background: no-repeat center $lightGray;
    background-size: contain;

    &:nth-child(1) {
      margin: 0;
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

    div {
      margin: 10px;
    }

    div,
    i {
      color: $white;
      text-shadow: 0 0 2px $white;
    }

    i {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      height: 100%;
      font-size: 30px;

      &::before {
        margin: auto;
      }
    }

    &:hover i {
      color: $lightGray;
      text-shadow: 0 0 2px $black;
    }

    @media (max-width: $screen-phone) {
      flex-shrink: 0;
      width: 100%;
      margin: 30px 0 0;
    }
  }
}
</style>
