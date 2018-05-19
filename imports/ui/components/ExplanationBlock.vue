<template>
  <ae-panel
    title="How to sign your vote"
    :closeHandler="closeHandler"
    :class="{ hidden: !display }"
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
  @import "/node_modules/@aeternity/aepp-components/dist/variables";

  .ae-panel {
    overflow: hidden;
    transition: max-height .3s, opacity .5s, margin .5s;
    max-height: 600px;

    &.hidden {
      max-height: 0;
      opacity: 0;
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  .explanation-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    > * {
      flex-grow: 1;
      cursor: pointer;
      position: relative;
      box-sizing: border-box;
      background: no-repeat center lightgray;
      background-size: contain;
      font-size: 1.2em;
      margin-left: 30px;
      &:nth-child(1) {
        margin: 0;
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
      div {
        margin: 10px;
      }
      div, i {
        color: white;
        text-shadow: 0 0 2px white;
      }
      i {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 30px;
        display: flex;
        &::before {
          margin: auto;
        }
      }
      &:hover i {
        color: lightgray;
        text-shadow: 0 0 2px black;
      }
      @media (max-width: $screen-phone){
        margin: 30px 0 0 0;
        flex-shrink: 0;
        width: 100%;
      }
    }
  }
</style>

<style lang="scss">
  .ae-panel.hidden {
    & + *, & + * > :first-child {
      margin-top: 0 !important;
    }
  }
</style>
