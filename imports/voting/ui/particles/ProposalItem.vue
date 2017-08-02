<template>
    <li class="proposal-item">
        <div class="proposal-content">
            <h3>Proposal name: {{proposal.title}}</h3>
            <p>{{proposal.updatedAt | dateFormat}}</p>
        </div>
        <div class="voted">
            <h3 class="main">{{proposal.total | sumFormat}}</h3>
            <p>+{{proposal.agreed | sumFormat}}</p>
            <p>-{{proposal.doubt | sumFormat}}</p>
            <div class="ovrl">
                <button @click="toggleProposalModal">&#9660</button>
                <button @click="toggleProposalModal" class="upvote">&#9650</button>
            </div>
        </div>
    </li>
</template>

<script>
  export default {
    props: ['proposal'],
    methods: {
      toggleProposalModal() {
        this.$store.commit('voting/toggleProposalModal');
      },
    },
  }
</script>

<style lang="scss" scoped>
    @import '/imports/core/ui/styles/variables';
    @import '/imports/core/ui/styles/mixins';

    .proposal-item {
        position: relative;
        background: white;
        @include flexbox;
        @include transform(translateZ(0));
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        border-radius: $base-border-radius;
        margin-bottom: $gutter;
        box-shadow: $base-box-shadow;
        text-transform: uppercase;
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
        }
        .proposal-content {
            padding: $gutter * 1.5 $gutter $gutter * 1.5 $gutter * 2;
            @include flex-grow(1);
        }
        .voted {
            position: relative;
            padding: $gutter * 1.5 $gutter $gutter * 1.5 $gutter * 2;
            width: 150px;
            padding-right: $gutter * 1.5;
            @include flex-grow(0);
            @include flex-shrink(0);
            text-align: right;
            h3 {
                color: $green;
            }
            p {
                font-family: $font-family-header;
            }
            &:hover {
                .ovrl {
                    opacity: 1;
                    visibility: visible;
                }
            }
            .ovrl {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                opacity: 0;
                visibility: hidden;
                text-align: center;
                background: rgba(255, 255, 255, .8);
                @include flexbox;
                @include align-items(center);
                @include justify-content(center);
                @include transition();
                button {
                    width: 62px;
                    height: 62px;
                    margin: 5px;
                    border-width: 2px;
                    font-size: 18px;
                    color: $red;
                    border-color: $red;
                    &:hover {
                        background: $red;
                        color: white;
                    }
                    &.upvote {
                        color: $green;
                        border-color: $green;
                        &:hover {
                            background: $green;
                            color: white;
                        }
                    }
                }
            }
        }
        .controls {
            @include flex-grow(0);
            @include flex-shrink(0);
            padding: $gutter / 2 $gutter;
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
    }
</style>