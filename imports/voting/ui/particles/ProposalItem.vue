<template>
  <router-link
    :to="{ name: 'proposal', params: { id: this.proposal._id } }"
    class="proposal-item"
  >
    <div class="proposal-content">
      <h3>{{proposal.statement}}</h3>
      <p>{{proposal.updatedAt | dateFormat}}</p>
    </div>

    <div class="voted">
      {{upVoteAmount}} agreed ({{upVoteProcent}}%)<br />
      {{downVoteAmount}} disagreed ({{downVoteProcent}}%)
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
  </router-link>
</template>

<script>
  import format from 'format-number';

  export default {
    props: ['proposal'],
    computed:
      ['up', 'down'].reduce((p, d) => ({
        ...p,
        [`${d}VoteAmount`]() {
          const amount = this.proposal[`${d}VoteAmount`];
          return format({ suffix: ' Æ' })(amount.toFixed(amount % 1 ? 2 : 0));
        },
        [`${d}VoteProcent`]() {
          return this.proposal.totalVoteAmount
            ? Math.round(
              this.proposal[`${d}VoteAmount`]
              / this.proposal.totalVoteAmount * 100
            )
            : 0;
        },
      }), {}),
  }
</script>

<style lang="scss" scoped>
  @import '/imports/voting/ui/styles/variables';

  .proposal-item {
    position: relative;
    background: white;
    display: flex;
    flex-direction: row;
    border-radius: $base-border-radius;
    margin-bottom: $gutter;
    box-shadow: $base-box-shadow;
    text-decoration: none;
    color: inherit;
    padding: 0 0 15px;

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
    }

    .proposal-content {
      padding: $gutter * 1.5 $gutter $gutter * 1.5 $gutter * 2;
      flex-grow: 1;

      h3 {
        margin: 0 0 5px 0;
      }
      p {
        color: $gray-light;
        font-size: 14px;
        margin: 0;
      }
    }

    .voted {
      position: relative;
      padding: $gutter * 1.5 $gutter * 1.5 $gutter * 1.5 $gutter * 2;
      flex-grow: 1;
      flex-shrink: 0;
      text-align: right;
      font-family: $font-family-header;
      color: black;
      font-size: 16px;
      line-height: 26px;
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

    @media screen and (max-width: $container-width) {
      flex-wrap: wrap;

      &:after {
        width: 100%;
        height: 5px;
      }

      .proposal-content {
        flex-shrink: 0;
        box-sizing: border-box;
        width: 100%;
      }

      .voted {
        text-align: left;
      }
    }
  }
</style>
