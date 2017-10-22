<template>
  <div class="style-guide">
    <button class="button large pink">
      close
    </button>
    <button class="button medium pink">
      button
    </button>
    <button class="button normal pink">
      button
    </button>
    <button class="button large grey">
      close
    </button>
    <button class="button large white">
      close
    </button>
    <button class="button large lightgrey">
      close
    </button>
    <button class="button label inactive purple">
      close
    </button>
    <button class="button label active purple">
      close
    </button>
    <div class="amount">
      <button class="subtract">-</button>
      <div class="value">
        200
        <div class="unit">Æ</div>
      </div>
      <button class="add">+</button>
    </div>
    <div class="amount full-width">
      <button class="subtract">-</button>
      <div class="value">
        200
        <div class="unit">Æ</div>
      </div>
      <button class="add">+</button>
    </div>
  </div>
</template>

<style lang="scss">
  @import "/imports/voting/ui/styles/common-variables";

  body {
    font-family: 'Roboto';
    font-weight: 500;
    button.button {
      display: block;
      border: none;
      border-radius: 100px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.11);
      color: #fff;
      &.normal {
        font-size: 16px;
        height: 40px;
        width: 100px;
      }
      &.medium {
        font-size: 16px;
        height: 45px;
        width: 141px;
      }
      &.large {
        font-size: 17px;
        height: 50px;
        width: 305px;
      }
      &.pink {
        background-color: $maegenta;
      }
      &.purple {
        background-color: $eggplant;
      }
      &.lightgrey {
        background-color: $silver;
        color: #000;
      }
      &.white {
        background-color: #fff;
        color: #000;
      }
      &.grey {
        background-color: $grey;
      }
      &.inactive {
        opacity: 0.5;
        cursor: not-allowed;
      }
      &.label {
        width: 100px;
        height: 30px;
        font-size: 12px;
        letter-spacing: 0.2px;
        text-transform: uppercase;
      }
    }
    div.amount {
      width: 310px;
      border-radius: 10px;
      border: solid 2px $smoke;
      height: 70px;
      background-color: #fff;
      display: block;
      position: relative;
      &.full-width {
        width: 100%;
      }
      button {
        position: absolute;
        background: none;
        border: none;
        width: 62px;
        height: 70px;
        float: left;
        font-size: 40px;
        font-weight: 300;
        &.add {
          right: 0;
        }
        &.subtract {
          left: 0;
        }
      }
      div.value {
        line-height: 70px;
        float: left;
        width: calc(100% - 124px);
        font-size: 40px;
        font-weight: 300;
        text-align: center;
        position: absolute;
        left: 62px;
        div.unit {
          font-size: 14px;
          display: inline;
        }
      }
    }
  }
</style>
