<template>
  <blaze-template
    :key="id"
    :data="{ id }"
    template="commentsBox" />
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
  },
};
</script>

<style lang="scss">
  @import "/node_modules/@aeternity/aepp-components/dist/variables";

  .comments-box {
    max-width: none;
    padding: 0;

    .comments {
      padding-top: 0;
    }

    .comments.ui {
      display: flex;
      flex-direction: column;

      .sorting {
        display: none;
      }

      .message,
      textarea {
        border-radius: 10px;
        border: solid 2px $smoke;
        padding: 5px 50px;
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 26px;
      }

      .message {
        background-color: #fffaf3;
        color: #573a08;
        border-color: #c9ba9b;
        margin: 15px 0;
      }

      textarea {
        resize: vertical;
        height: 50px;
        font-family: inherit;

        ::placeholder {
          color: $grey;
        }
      }

      form {
        overflow: hidden;

        &.comment-form {
          order: 1;
          margin-top: 20px;
        }

        button,
        .button {
          margin-top: 15px;
          min-width: 150px;
          padding: 0 15px;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          background-color: $maegenta;
          text-transform: uppercase;
          font-size: 14px;
          color: $white;
          float: right;
          border: none;
        }
      }

      .comment {
        margin-top: 0.5em;
        margin-bottom: 0.5em;

        .comments .comment {
          margin-top: 1em;
          margin-bottom: 1em;

          &:last-child {
            margin-bottom: 0;
          }
        }

        .avatar {
          display: none;
        }

        .content {
          .author {
            color: $maegenta;
            font-size: 12px;
            text-transform: uppercase;
          }

          .metadata,
          .actions {
            color: $grey;
            font-size: 12px;
          }

          .metadata {
            display: inline-block;
            margin-left: 0.5em;
          }

          .comment-content {
            margin: 6px 0;
            line-height: 26px;
            font-size: 16px;

            a {
              color: #4183c4;
            }
          }

          .actions {
            .rating {
              .angle.up.icon {
                display: inline-block;
                font: normal normal normal 14px/1 FontAwesome, fantasy;
                font-size: inherit;
                text-rendering: auto;

                &::before {
                  content: '\f106';
                }
              }
            }

            a {
              cursor: pointer;
              display: inline-block;
              margin-right: 0.7em;

              &:hover {
                color: black;
              }
            }
          }

          .create-reply .reply-form {
            margin-top: 12px;
          }

          .reply-wrapper {
            margin-left: 3em;
          }
        }
      }
    }
  }
</style>
