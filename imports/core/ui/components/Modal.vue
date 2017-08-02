<template>
    <div class="modal">
        <div class="overlay"></div>
        <div class="modal-cont">
            <div class="modal-header">
                <button @click="toggleProposalModal">Close</button>
            </div>
            <div class="voting-section">

            </div>
            <div class="comments">
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
                <h3>comment</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      methods: {
        toggleProposalModal() {
          this.$store.commit('voting/toggleProposalModal');
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
        @include flexbox;
        @include justify-content(center);
        @include align-items(center);
        z-index: 100;
        overflow: hidden;
        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, .7);
            z-index: 1;
        }
        .modal-cont {
            @include flexbox;
            @include flex-direction(column);
            position: relative;
            z-index: 2;
            width: 650px;
            height: auto;
            background: white;
            border-radius: $base-border-radius;
            box-shadow: $base-box-shadow;
            max-height: 90vh;
            .modal-header {
                button {
                    float: right;
                    border: 0;
                    padding: 0;
                    text-transform: uppercase;
                }
            }
            .modal-header, .voting-section, .comments {
                padding: $gutter $gutter * 2;
            }
            .modal-header, .voting-section {
                @include flex-grow(1);
                @include flex-shrink(1);
            }
            .voting-section {
                height: 300px;
            }
            .comments {
                overflow-y: scroll;
            }
        }
    }
</style>