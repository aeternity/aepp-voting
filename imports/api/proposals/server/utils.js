import erc20contract, { decimals } from '../../../startup/server/tokenContract';
import { Accounts } from '../../accounts/accounts';
import { Proposals } from '../proposals';

export const reComputeProposalsUpdatedAt = () =>
  Proposals.find({}).forEach(({ _id, votes, createdAt }) =>
    Proposals.update(_id, {
      $set: {
        updatedAt: Math.max(createdAt, ...Object.values(votes).map(v => v.createdAt)),
      },
    }, { getAutoValues: false }));

export const reFetchAccountsBalances = () =>
  Accounts.find({}).forEach(({ _id, balance: oldBalance }) => {
    const balance = +erc20contract.balanceOf(_id).shift(decimals.neg());
    if (balance === oldBalance) return;
    Accounts.update(_id, { $set: { balance } });
  });

export const reComputeProposalsAmounts = () =>
  Proposals.find({}).forEach(({ _id, votes }) => {
    let upVoteAmount = 0;
    let downVoteAmount = 0;
    Object.keys(votes).forEach((address) => {
      const { balance } = Accounts.findOne(address);
      if (votes[address].upVote) upVoteAmount += balance;
      else downVoteAmount += balance;
    });
    const totalVoteAmount = upVoteAmount + downVoteAmount;
    Proposals.update(_id, {
      $set: {
        upVoteAmount,
        downVoteAmount,
        totalVoteAmount,
        upVoteRatio: upVoteAmount / totalVoteAmount,
      },
    }, { getAutoValues: false });
  });
