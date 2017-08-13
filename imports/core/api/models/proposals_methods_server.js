import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Proposals } from './proposals';
import { Accounts } from '/imports/accounts';
import { getEthereumAddress, onErc20ContractReceiving } from '/imports/ethereum';

const UP_VOTE = Symbol('up-vote');
const DOWN_VOTE = Symbol('down-vote');

onErc20ContractReceiving(erc20contract =>
  Meteor.methods({
    'proposals.vote'(proposalId, signature, upVote) {
      check(proposalId, String);
      check(signature, String);
      check(upVote, Boolean);

      const proposal = Proposals.findOne(proposalId);
      if (!proposal) throw new Meteor.Error('Proposal not found');

      let accountId;
      try {
        accountId = getEthereumAddress(
          `I ${upVote ? '' : 'dis'}agree that ` + proposal.statement, signature);
      }
      catch (e) {
        throw new Meteor.Error('Something wrong with signature');
      }
      const balance = +erc20contract.balanceOf(accountId);
      if (!balance) throw new Meteor.Error('You do not have aeternity tokens');
      if (Accounts.findOne(accountId)) Accounts.update(accountId, { balance });
      else Accounts.insert({ _id: accountId, balance });

      const previousVote = !!proposal.votes[accountId] &&
        (proposal.votes[accountId].upVote ? UP_VOTE : DOWN_VOTE);

      if (
        (upVote && previousVote === UP_VOTE) ||
        (!upVote && previousVote === DOWN_VOTE)
      ) {
        throw new Meteor.Error('Already voted in this proposal');
      }

      Proposals.update(proposalId, {
        $inc: {
          [upVote ? 'upVoteAmount' : 'downVoteAmount']: balance,
          ...previousVote && {
            [upVote ? 'downVoteAmount' : 'upVoteAmount']: -balance,
          },
        },
        $set: {
          [`votes.${accountId}`]: { signature, upVote, createdAt: new Date() },
        },
      });
    },
  }));
