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
@import '/node_modules/@aeternity/aepp-components/dist/variables';

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
      box-sizing: border-box;
      width: 100%;
      padding: 5px 50px;
      font-size: 16px;
      line-height: 26px;
      border: solid 2px $smoke;
      border-radius: 10px;
    }

    .message {
      margin: 15px 0;
      color: #573a08;
      background-color: #fffaf3;
      border-color: #c9ba9b;
    }

    textarea {
      height: 50px;
      font-family: inherit;
      resize: vertical;

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
        float: right;
        min-width: 150px;
        height: 30px;
        padding: 0 15px;
        margin-top: 15px;
        font-size: 14px;
        line-height: 30px;
        color: $white;
        text-transform: uppercase;
        background-color: $maegenta;
        border: none;
        border-radius: 15px;
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
          font-size: 12px;
          color: $maegenta;
          text-transform: uppercase;
        }

        .metadata,
        .actions {
          font-size: 12px;
          color: $grey;
        }

        .metadata {
          display: inline-block;
          margin-left: 0.5em;
        }

        .comment-content {
          margin: 6px 0;
          font-size: 16px;
          line-height: 26px;

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
            display: inline-block;
            margin-right: 0.7em;
            cursor: pointer;

            &:hover {
              color: $black;
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
