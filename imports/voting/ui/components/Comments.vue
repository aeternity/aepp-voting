<template>
  <blaze-template :key="id" template="commentsBox" :data="{ id }" />
</template>

<script>
  export default {
    props: ['id'],
  };
</script>

<style lang="scss">
  @import "/imports/voting/ui/styles/variables";

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
      .message, textarea {
        border-radius: 4px;
        border: solid 1px $gray-light;
        padding: 7px;
        width: 100%;
        box-sizing: border-box;
      }
      .message {
        background-color: #fffaf3;
        color: #573a08;
        border-color: #c9ba9b;
        margin: $gutter 0;
      }
      textarea {
        resize: vertical;
        height: 60px;
      }
      form {
        overflow: hidden;
        &.comment-form {
          order: 1;
          margin-top: .5em;
        }
        button, .button {
          margin-top: $gutter / 2;
          border-width: 2px;
          float: right;
          &:hover {
            background: $brand-color;
            color: white;
          }
        }
      }
      .comment {
        margin-top: .5em;
        margin-bottom: .5em;
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
            color: gray;
          }
          .metadata, .actions {
            color: lightgray;
            font-size: .9em;
          }
          .metadata {
            display: inline-block;
            margin-left: .5em;
          }
          .comment-content {
            margin: $gutter / 2 0;
            a {
              color: #4183c4;
            }
          }
          .actions {
            .rating {
              .angle.up.icon {
                display: inline-block;
                font: normal normal normal 14px/1 FontAwesome;
                font-size: inherit;
                text-rendering: auto;
                &:before {
                  content: '\f106';
                }
              }
            }
            a {
              cursor: pointer;
              display: inline-block;
              margin-right: .7em;
              &:hover {
                color: black;
              }
            }
          }
          .create-reply .reply-form {
            margin-top: $gutter;
          }
          .reply-wrapper {
            margin-left: 3em;
          }
        }
      }
    }
  }
</style>
