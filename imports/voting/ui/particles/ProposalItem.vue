<template>
  <router-link
    :to="{ name: 'proposal', params: { id: this.proposal._id } }"
    class="proposal-item"
  >
    <div class="proposal-content">
      <h3>{{proposal.statement}}</h3>
      <p>{{proposal.updatedAt | dateFormat}}</p>
    </div>
    <aside>
      <div class="voted">
        <h3 class="main">
          <span>{{sumVoteAmount < 0 ? '-' : ''}}</span> {{Math.abs(sumVoteAmount) | sumFormat}}
        </h3>
        <p>{{proposal.upVoteAmount | sumFormat}}</p>
        <p><span>-</span> {{proposal.downVoteAmount | sumFormat}}</p>
      </div>
      <div class="controls">
        <button
          class="vote"
          :class="{ already: proposal.vote && proposal.vote.upVote }"
        >
          <i class="fa fa-thumbs-up" />
        </button>
        <router-link
          :to="{ name: 'proposal', params: { id: this.proposal._id, vote: 'doubt' } }"
          class="button vote"
          :class="{ already: proposal.vote && proposal.vote.upVote === false }"
        >
          <i class="fa fa-thumbs-down" />
        </router-link>
      </div>
    </aside>
  </router-link>
</template>

<script>
  export default {
    props: ['proposal'],
    computed: {
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
      background: $brand-color;
      @media screen and (max-width: $container-width) {
        width: 100%;
        height: 5px;
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
        color: $gray-dark;
      }
      p {
        font-family: $font-family-header;
        color: $gray;
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
    color: $gray-light;
    font-size: 14px;
    span {
      font-size: 18px;
    }
  }
</style>
