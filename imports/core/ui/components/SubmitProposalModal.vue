<template>
    <div class="modal">
        <div class="overlay"></div>
        <div class="modal-cont">
            <div class="modal-header">
                <button @click="toggleSubmitProposalModal">Close</button>
            </div>
            <div class="submit-proposal">
                <form>
                    <p>Please keep the statement short and simple, e. g. "God exists".</p>
                    <p>When users vote on it, the prefix "I believe that " or "I doubt that " will be added depending on their choice.</p>
                    <input placeholder="Your statement"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      methods: {
        toggleSubmitProposalModal() {
          this.$store.commit('core/toggleSubmitProposalModal');
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
            .modal-header {
                padding: $gutter $gutter * 2;
            }
            .modal-header {
                @include flex-grow(1);
                @include flex-shrink(1);
            }
            .submit-proposal {
                height: 300px;
                >form {
                    padding: 20px;
                    text-align: center;
                    >input {
                        margin: 0 auto;
                        height: 30px;
                        width: 80%;
                        padding: 15px;
                        border-radius: 5px;
                        border: solid 1px #eaeaea;
                        box-shadow: none;
                        display: block;
                    }
                    > button {
                        text-transform: uppercase;
                        margin-top: 20px;
                        height: 50px;
                    }
                }
            }
        }
    }
</style>
