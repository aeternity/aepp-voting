import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Proposals } from './proposals';
import { Accounts } from '/imports/accounts/index';
import { getEthereumAddress, onErc20ContractReceiving } from '/imports/ethereum/index';

const UP_VOTE = Symbol('up-vote');
const DOWN_VOTE = Symbol('down-vote');

onErc20ContractReceiving(erc20contract => {
  const getAccountInfo = (statement, signature, upVote) => {
    let accountId;
    try {
      accountId = getEthereumAddress(
        `I ${upVote ? '' : 'dis'}agree that ` + statement, signature);
    }
    catch (e) {
      throw new Meteor.Error('invalid-signature');
    }
    const balance = +erc20contract.balanceOf(accountId).shift(erc20contract.decimals().neg());
    if (!balance) throw new Meteor.Error('no-tokens');

    const account = Accounts.findOne(accountId);
    if (account && account.balance !== balance) Accounts.update(accountId, { balance });
    if (!account) Accounts.insert({ _id: accountId, balance });

    return { accountId, balance };
  };

  Meteor.methods({
    'proposals.add'(statement, signature, upVote) {
      check(statement, String);
      check(signature, String);
      check(upVote, Boolean);

      const { accountId, balance } = getAccountInfo(statement, signature, upVote);

      return {
        accountId,
        proposalId: Proposals.insert({
          statement,
          [`${upVote ? 'up' : 'down'}VoteAmount`]: balance,
          totalVoteAmount: balance,
          votes: {
            [accountId]: { signature, upVote, createdAt: new Date() },
          },
          upVoteRatio: upVote ? 1 : 0,
        }),
      };
    },
    'proposals.vote'(proposalId, signature, upVote) {
      check(proposalId, String);
      check(signature, String);
      check(upVote, Boolean);

      const proposal = Proposals.findOne(proposalId);
      if (!proposal) throw new Meteor.Error('proposal-not-found');

      const { accountId, balance } = getAccountInfo(proposal.statement, signature, upVote);

      const previousVote = !!proposal.votes[accountId] &&
        (proposal.votes[accountId].upVote ? UP_VOTE : DOWN_VOTE);

      if (
        (upVote && previousVote === UP_VOTE) ||
        (!upVote && previousVote === DOWN_VOTE)
      ) {
        throw new Meteor.Error('already-voted');
      }

      const { upVoteAmount: upVA, downVoteAmount: downVA } = proposal;
      const dUpVA = upVote ? balance : (previousVote ? -balance : 0);
      const dDownVA = !upVote ? balance : (previousVote ? -balance : 0);

      Proposals.update(proposalId, {
        $inc: {
          upVoteAmount: dUpVA,
          downVoteAmount: dDownVA,
          totalVoteAmount: dUpVA + dDownVA,
        },
        $set: {
          [`votes.${accountId}`]: { signature, upVote, createdAt: new Date() },
          upVoteRatio: (upVA + dUpVA) / (upVA + dUpVA + downVA + dDownVA),
        },
      });

      return { accountId };
    },
  });
});
