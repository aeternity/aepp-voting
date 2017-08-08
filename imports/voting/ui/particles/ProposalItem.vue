<template>
  <li
    class="proposal-item"
    :class="voteClass"
    @click="toggleProposalModal('agree')"
  >
    <div class="proposal-content">
      <h3>{{proposal.statement}}</h3>
      <p>{{proposal.updatedAt | dateFormat}}</p>
    </div>
    <aside>
      <div class="voted">
        <h3 class="main" :class="voteClass">
          {{proposal.upVoteAmount + proposal.downVoteAmount | sumFormat}}
        </h3>
        <p class="agreed"><span>+</span> {{proposal.upVoteAmount | sumFormat}}</p>
        <p class="doubt"><span>-</span> {{proposal.downVoteAmount | sumFormat}}</p>
      </div>
      <div class="controls">
        <button @click="toggleProposalModal('agree')" class="upvote"><i class="fa fa-chevron-up" /></button>
        <button @click.stop="toggleProposalModal('doubt')"><i class="fa fa-chevron-down" /></button>
      </div>
    </aside>
  </li>
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
    },
    methods: {
      toggleProposalModal(type) {
        console.log(type);
        this.$store.commit('voting/toggleProposalModal', {  proposal: this.proposal, type });
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '/imports/core/ui/styles/variables';

  .proposal-item {
    position: relative;
    background: white;
    cursor: pointer;
    display: flex;
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: $base-border-radius;
    margin-bottom: $gutter;
    box-shadow: $base-box-shadow;
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
      padding: $gutter * 1.5 $gutter $gutter * 1.5 $gutter * 2;
      width: 140px;
      padding-right: $gutter * 1.5;
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
      button {
        width: 62px;
        height: 62px;
        margin: 5px;
        border-width: 2px;
        font-size: 22px;
        color: $red;
        padding: 0;
        border-color: $red;
        i {
          position: relative;
          top: -2px;
        }
        &:hover {
          background: $red;
          color: white;
        }
        &.upvote {
          color: $green;
          border-color: $green;
          i {
            top: -1px;
          }
          &:hover {
            background: $green;
            color: white;
          }
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
