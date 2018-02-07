<template>
  <ae-panel
    :to="{ name: 'proposal', params: { id: this.proposal._id } }"
    :ratio="ratio"
  >
    <div class="proposal-item">
      <div class="content">
        <h2>{{proposal.statement}}</h2>
        <proposal-secondary :proposal="proposal" />
        <table>
          <tr>
            <td>{{upVoteProcent}}%</td>
            <td><i class="fa fa-thumbs-up" /></td>
            <td>Agreed</td>
            <td>{{upVoteAmount}}&nbsp;Æ</td>
          </tr>
          <tr>
            <td>{{downVoteProcent}}%</td>
            <td><i class="fa fa-thumbs-down" /></td>
            <td>Disagreed</td>
            <td>{{downVoteAmount}}&nbsp;Æ</td>
          </tr>
        </table>
      </div>
      <div class="arrow">
        <i class="fa fa-angle-right" />
      </div>
    </div>
  </ae-panel>
</template>

<script>
  import format from 'format-number';

  import AePanel from '../../../components/AePanel.vue';
  import AeCategory from '../../../components/AeCategory.vue';
  import ProposalSecondary from './ProposalSecondary.vue';

  export default {
    components: { AePanel, AeCategory, ProposalSecondary },
    props: ['proposal'],
    computed:
      ['up', 'down'].reduce((p, d) => ({
        ...p,
        [`${d}VoteAmount`]() {
          return format()(this.proposal[`${d}VoteAmount`].toFixed(0));
        },
        [`${d}VoteProcent`]() {
          return this.proposal.totalVoteAmount
            ? (Math.round(this.proposal[`${d}VoteAmount`]
              / this.proposal.totalVoteAmount) * 100)
            : 0;
        },
      }), {
        ratio() {
          return this.proposal.upVoteAmount / this.proposal.totalVoteAmount;
        },
      }),
  };
</script>

<style lang="scss" scoped>
  @import '../../../components/variables';

  .proposal-item {
    display: flex;
    flex-direction: row;

    .content {
      flex-grow: 1;

      h2 {
        margin: 0;
        font-size: 27px;
        font-weight: 500;
      }

      table {
        margin-top: 25px;
        tr {
          &:first-child {
            td {
              padding-top: 0;
            }
            td:nth-child(1), td:nth-child(3) {
              color: $maegenta;
            }
          }
          &:last-child {
            td {
              padding-bottom: 0;
            }
          }
          td {
            font-size: 16px;
            padding: 5px;

            &:first-child {
              font-size: 18px;
              padding-left: 0;
            }
            &:nth-child(2) {
              color: #f5b826;
              font-size: 20px;
            }
            &:nth-child(3) {
              font-weight: bold;
              color: $aubergine;
            }
            &:last-child {
              color: $grey;
              padding-left: 80px;
            }
          }
        }
      }
    }

    .arrow {
      color: $dark;
      font-size: 28px;
      display: flex;
      margin-left: 30px;

      i {
        margin: auto;
      }
    }
  }
</style>
