<template>
  <router-link
    :to="`/proposal/${this.proposal._id}`"
    class="proposal-item"
    :class="voteClass"
  >
    <div class="proposal-content">
      <h3>{{proposal.statement}}</h3>
      <p>{{proposal.updatedAt | dateFormat}}</p>
    </div>
    <aside>
      <div class="voted">
        <h3 class="main" :class="voteClass">
          <span>{{sumVoteAmount < 0 ? '-' : '+'}}</span> {{Math.abs(sumVoteAmount) | sumFormat}}
        </h3>
        <p class="agreed"><span>+</span> {{proposal.upVoteAmount | sumFormat}}</p>
        <p class="doubt"><span>-</span> {{proposal.downVoteAmount | sumFormat}}</p>
      </div>
      <div class="controls">
        <button
          class="up-vote"
          :class="{ already: proposal.vote && proposal.vote.upVote }"
        >
          <i class="fa fa-chevron-up" />
        </button>
        <router-link
          :to="`/proposal/${this.proposal._id}/doubt`"
          class="down-vote button"
          :class="{ already: proposal.vote && proposal.vote.upVote === false }"
        >
          <i class="fa fa-chevron-down" />
        </router-link>
      </div>
    </aside>
  </router-link>
</template>

<script>
  export default {
    props: ['proposal'],
    computed: {
      voteClass() {
        return this.proposal.upVoteAmount > this.proposal.downVoteAmount
          ? 'agreed'
          : 'doubt'
      },
      sumVoteAmount() {
        return this.proposal.upVoteAmount - this.proposal.downVoteAmount;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '/imports/voting/ui/styles/variables';

  .proposal-item {
    position: relative;
    background: white;
    display: flex;
    border-radius: $base-border-radius;
    margin-bottom: $gutter;
    box-shadow: $base-box-shadow;
    text-decoration: none;
    color: inherit;
    @media screen and (max-width: $container-width) {
      flex-direction: column;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 5px;
      left: 0;
      top: 0;
      height: 100%;
      border-top-left-radius: $base-border-radius;
      border-bottom-left-radius: $base-border-radius;
      background: $green;
      @media screen and (max-width: $container-width) {
        width: 100%;
        height: 5px;
      }
    }
    &.doubt {
      &:after {
        background: $red !important;
      }
    }
    .proposal-content {
      padding: $gutter * 1.5 $gutter $gutter * 1.5 $gutter * 2;
      flex-grow: 1;
    }
    .voted {
      position: relative;
      padding: $gutter * 1.5 $gutter * 1.5 $gutter * 1.5 $gutter * 2;
      width: 140px;
      flex-grow: 0;
      flex-shrink: 0;
      text-align: right;
      @media screen and (max-width: $container-width) {
        text-align: left;
      }
      h3 {
        color: $green;
        &.doubt {
          color: $red;
        }
      }
      p {
        font-family: $font-family-header;
      }
    }
    aside {
      display: flex;
    }
    .controls {
      display: flex;
      flex-grow: 0;
      flex-shrink: 0;
      align-items: center;
      padding: $gutter / 2 $gutter;
      button, .button {
        width: 62px;
        height: 62px;
        line-height: 62px;
        margin: 5px;
        font-size: 22px;
        padding: 0;
        i {
          position: relative;
          top: -2px;
        }
      }
    }
  }

  h3, p {
    margin: 0;
  }

  h3 {
    margin-bottom: 5px;
  }

  p {
    font-family: $font-family-accent;
    color: $gray-light;
    font-size: 14px;
    &.agreed {
      color: $green;
    }
    &.doubt {
      color: $red;
    }
    span {
      font-size: 18px;
    }
  }
</style>
