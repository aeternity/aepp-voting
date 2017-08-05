<template>
    <div class="modal">
        <div class="overlay" @click="toggleSubmitProposalModal"></div>
        <div class="modal-cont">
            <div class="modal-header">
                <button @click="toggleSubmitProposalModal">Close</button>
            </div>
            <div class="submit-proposal">
                <form @submit.prevent="submitSubmitProposalForm">
                    <h3>Please keep the statement short and simple, e. g. "God exists".</h3>
                    <input :class="{error: error}" v-model="title" placeholder="Your statement"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                error: false,
            }
        },
        methods: {
            toggleSubmitProposalModal() {
                this.$store.commit('core/toggleSubmitProposalModal');
            },
            submitSubmitProposalForm() {
                if (this.title) {
                  this.$store.dispatch('core/submitSubmitProposalForm', this.title);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
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
        h3 {
            margin-top: 0;
            padding: 0 40px;
        }
        p {
            font-family: $font-family-accent;
            font-size: 16px;
            padding: 0 40px;
        }
        input.error {
            border-color: $red;
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
            @media screen and (max-width: $container-width) {
                max-width: 96vw;
            }
            .modal-header {
                button {
                    float: right;
                    border: 0;
                    padding: 0;
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
                padding-bottom: $gutter;
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
                        padding: 10px 50px;
                        &:hover {
                            background: $brand-color;
                            color: white;
                        }
                    }
                }
            }
        }
    }
</style>
