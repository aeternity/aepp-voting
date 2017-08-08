<template>
  <div class="modal">
    <div class="overlay" @click="toggleProposalModal" />
    <div class="modal-cont">
      <div class="modal-header">
        <button @click="toggleProposalModal">Close</button>
      </div>
      <div class="statement">
        <div class="quote left">
          <i class="fa fa-quote-left" />
        </div>
        <h2>{{proposal.statement}}</h2>
        <div class="quote right">
          <i class="fa fa-quote-right" />
        </div>
      </div>
      <div class="voting-section" :class="proposalType">
        <div class="tab-header">
          <button
            class="agree"
            :class="{active: isActive('agree')}"
            @click="setProposalType('agree')"
          >
            I agree
          </button>
          <button
            class="doubt"
            :class="{active: isActive('doubt')}"
            @click="setProposalType('doubt')"
          >
            I doubt
          </button>
        </div>
        <form @submit.prevent="vote" class="tab">
          <h5>Please copy the above statement, sign it with your Ethereum address, and paste signature here</h5>
          <input type="text" v-model="signature" placeholder="Place signature here">
          <button>Submit</button>
        </form>
      </div>
      <div class="comments">
        <VueDisqus
          shortname="aeternity-voting"
          :identifier="proposal._id"
          :url="url"></VueDisqus>
      </div>
    </div>
  </div>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  export default {
    props: ['proposal',  'type'],
    data() {
      return {
        signature: '',
      }
    },
    computed: {
      proposalType() {
        return this.$store.state.voting.proposalType;
      },
      url() {
        return Meteor.absoluteUrl() + 'proposal/' + this.proposal._id;
      }
    },
    components: {
      VueDisqus
    },
    methods: {
      isActive(type) {
        return this.$store.state.voting.proposalType === type;
      },
      toggleProposalModal() {
        this.$store.commit('voting/toggleProposalModal');
      },
      setProposalType(type) {
        this.$store.commit('voting/setProposalType', type);
      },
      vote() {
        if (this.signature) {
          this.$store.dispatch('voting/vote', this.signature);
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "/imports/core/ui/styles/variables";
  @import "/imports/core/ui/styles/mixins";

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow-y: scroll;
    padding: 40px 0;
    .overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .7);
      z-index: 1;
    }
    .modal-cont {
      position: relative;
      margin-bottom: 80px;
      margin-left: auto;
      margin-right: auto;
      @media screen and (max-width: $container-width) {
        max-width: 96vw;
      }
      z-index: 2;
      width: 650px;
      height: auto;
      background: white;
      border-radius: $base-border-radius;
      box-shadow: $base-box-shadow;
      .modal-header {
        button {
          float: right;
          border: 0;
          padding: 0;
        }
      }
      .modal-header, .voting-section, .comments {
        padding: $gutter $gutter * 2;
      }
      .modal-header, .voting-section {
      }
      .voting-section {
        height: 300px;
      }
    }
    .statement {
      position: relative;
      padding: 50px 70px;
      h2 {
        position: relative;
        text-align: center;
        font-size: 28px;
        z-index: 2;
        margin: 0;
      }
      .quote {
        position: absolute;
        font-size: 70px;
        color: $gray-lighter;
        z-index: 1;
        &.left {
          top: 0;
          left: 30px;
        }
        &.right {
          bottom: 0;
          right: 30px;
        }
      }
    }
    .voting-section {
      &.doubt {
        .tab {
          background: $red;
          button {
            color: $red;
            border: 2px solid $red;
            &:hover {
              border-color: lighten($red, 20%);
              color: lighten($red, 20%);
            }
          }
        }
      }
      .tab-header {
        position: relative;
        top: 1px;
        text-align: center;
        z-index: 2;
        button {
          font-size: 28px;
          padding: 10px 30px;
          border-top-left-radius: $base-border-radius;
          border-top-right-radius: $base-border-radius;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          border-bottom: 0;
          border-width: 0;
          &.doubt {
            color: $red;
            border-color: $red;
          }
          &.agree {
            color: $green;
            border-color: $green;
          }
          &.active {
            border-width: 1px;
            background: $green;
            color: white;
            &.doubt {
              background: $red;
            }
          }
        }
      }
      .tab {
        border-radius: $base-border-radius;
        padding: $gutter * 2 $gutter * 2 $gutter;
        background: $green;
        text-align: center;
        h5 {
          font-family: $font-family-accent;
          text-align: center;
          font-size: 14px;
          margin: $gutter;
          color: white;
        }
        input {
          display: block;
          font-size: 22px;
          padding: 10px;
          font-family: 'Roboto Light';
          color: white;
          border: 2px solid white;
          border-radius: $base-border-radius;
          width: 90%;
          margin: 0 auto;
          background: transparent;
          &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color:    rgba(255, 255, 255, .7);
          }
          &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:    rgba(255, 255, 255, .7);
            opacity:  1;
          }
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:    rgba(255, 255, 255, .7);
            opacity:  1;
          }
          &:-ms-input-placeholder { /* Internet Explorer 10-11 */
            color:    rgba(255, 255, 255, .7);
          }
          &::-ms-input-placeholder { /* Microsoft Edge */
            color:    rgba(255, 255, 255, .7);
          }
        }
        button {
          background: white;
          color: $green;
          margin: 10px;
          font-size: 24px;
          padding: 5px 70px;
          border: 2px solid $green;
          &:hover {
            border-color: lighten($green, 20%);
            color: lighten($green, 20%);
          }
        }
      }
    }
  }
</style>
