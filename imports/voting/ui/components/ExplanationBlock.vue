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
        @click="setYoutubeVideoId(video.youtubeId)"
      >
        <div>{{video.title}}</div>
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
    max-height: 600px;

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
        margin-left: $gutter;
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
          margin: $gutter;
        }
        div, i {
          text-shadow: 0 0 2px white;
        }
        i {
          color: $brand-color;
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
          color: white;
          text-shadow: 0 0 2px black;
        }
        @media screen and (max-width: $screen-xs){
          margin: $gutter 0 0 0;
          flex-shrink: 0;
          width: 100%;
        }
      }
    }
  }
</style>
