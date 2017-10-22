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
    <div class="balance med white">
      0.50
      <div class="unit">Æ</div>
    </div>
    <div class="balance large grey">
      0.50
      <div class="unit">Æ</div>
    </div>
    <div class="balance large dark">
      0.50
      <div class="unit">Æ</div>
    </div>
    <div class="card large">
      <div class="top">
        <div class="code"></div>
        <div class="balance large transparent">
          124.0
          <div class="unit">Æ</div>
        </div>
      </div>
      <div class="middle">
        <span>Public Identity</span>
        <p>0x2D3B9B763D0107FC0x2D3B9B763D0107FC</p>
      </div>
      <div class="bottom">
        <button class="copy">copy address</button>
        <button class="active">active</button>
      </div>
    </div>
    <div class="card minified">

    </div>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,500|Roboto:300,500|');
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
    div.balance {
      text-align: right;
      font-weight: 300;
      &.grey {
        color: $grey;
        background-color: #fff;
      }
      &.dark {
        color: #000;
        background-color: #fff;
      }
      &.transparent {
        color: #fff;
        background: none;
      }
      &.white {
        color: #fff;
        background-color: #000;
      }
      &.med {
        width: 180px;
        font-size: 40px;
        .unit {
          display: inline;
          font-size: 14px;
        }
      }
      &.large {
        width: 250px;
        font-size: 60px;
        .unit {
          display: inline;
          font-size: 20px;
        }
      }
    }
    div.card {
      padding: 10px 22px;
      &.large {
        width: 266px;
        height: 188px;
        border-radius: 10px;
        border: none;
        background-image: linear-gradient(to bottom, #f03c6e, #ff96a0);
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
        .top {
          display: inline-block;
          .code {
            margin-top: 12px;
            float: left;
            width: 48px;
            height: 48px;
            background-color: #000;
            border-radius: 100px;
            border: solid 1px $grey;
          }
          .balance {
            float: right;
            width: 200px;
          }
        }
        .middle {
          span {
            opacity: 0.5;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.9px;
            color: #fff;
            width: 100%;
          }
          p {
            width: 202px;
          	height: 19px;
          	font-family: 'Roboto Mono';
          	font-size: 16px;
          	font-weight: 500;
          	letter-spacing: 1px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          	color: #fff;
            margin-top: 3px;
          }
        }
        .bottom {
          button {
            text-transform: uppercase;
            width: 125px;
            height: 31px;
            border-radius: 100px;
            border: none;
            font-size: 12px;
          	font-weight: 500;
          	line-height: 2.0;
          	letter-spacing: 0.2px;
            &.copy {
              float: left;
              color: #000;
              background-color: #fff;
            }
            &.active {
              float: right;
              color: #fff;
              background: rgba(255, 255, 255, 0.2);
            }
          }
        }
      }
    }
  }
</style>
