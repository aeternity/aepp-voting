<template>
  <div class="explanation-video" :class="{ hidden: !display }">
    <header>
      <h3>How to sign your vote</h3>
      <button @click="toggleExplanationBlock">
        <i class="fa fa-close" />
      </button>
    </header>
    <main>
      <div
        v-for="video in videos"
        :style="getVideoStyle(video.youtubeId)"
        @click="setYoutubeVideoId(video.youtubeId)"
      >
        {{video.title}}
        <i class="fa fa-play" />
      </div>
    </main>
  </div>
</template>

<script>
  import { Meteor } from 'meteor/meteor';

  import { mapMutations } from 'vuex';

  export default {
    props: {
      display: { type: Boolean },
    },
    data() {
      return {
        videos: Meteor.settings.public.explanationVideo,
        modalVideoId: '',
      };
    },
    methods: {
      ...mapMutations({
        toggleExplanationBlock: 'voting/toggleExplanationBlock',
        setYoutubeVideoId: 'voting/setYoutubeVideoId',
      }),
      getVideoStyle(youtubeVideoId) {
        return {
          backgroundImage: `url(https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg)`,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "/imports/voting/ui/styles/variables";

  .explanation-video {
    background: white;
    border-radius: $base-border-radius;
    box-shadow: $base-box-shadow;
    margin-bottom: $gutter;
    overflow: hidden;
    transition: max-height .3s, opacity .5s;
    max-height: 400px;

    &.hidden {
      max-height: 0;
      opacity: 0;
    }

    header, main {
      margin: $gutter;
    }

    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      h3 {
        margin: unset;
      }
      button {
        color: black;
        border: none;
        padding: 0;
      }
    }

    main {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      $video-height: 238px;
      > * {
        flex-grow: 1;
        height: $video-height;
        cursor: pointer;
        position: relative;
        box-sizing: border-box;
        padding: $gutter;
        background: no-repeat center;
        background-size: contain;
        font-size: 1.2em;
        margin-left: $gutter;
        &:nth-child(1) {
          margin-left: 0;
        }
        &, i {
          text-shadow: 0 0 2px white;
        }
        i {
          color: $brand-color;
          position: absolute;
          line-height: $video-height;
          text-align: center;
          top: 0;
          left: 0;
          width: 100%;
          font-size: 30px;
        }
        &:hover i {
          color: white;
          text-shadow: 0 0 2px black;
        }
      }
      @media screen and (max-width: $container-width){
        > *:nth-child(2) {
          display: none;
        }
      }
    }
  }
</style>
