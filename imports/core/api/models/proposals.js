import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { _ } from 'underscore';

import { createdAt, updatedAt } from '/imports/common';
import { Accounts } from '/imports/accounts';

export const Proposals = new Mongo.Collection('proposals');

Proposals.attachSchema(new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  statement: { type: String },
  upVoteAmount: { type: SimpleSchema.Integer, defaultValue: 0 },
  downVoteAmount: { type: SimpleSchema.Integer, defaultValue: 0 },
  upVoteRatio: { type: Number, defaultValue: 0.5 },
  votes: { type: Object, blackbox: true, defaultValue: {} },
  /*
  votes: {
    accountId: { // ethereumAddressType
      signature: ethereumSignatureType,
      upVote: boolean,
      createdAt: Date,
    }
  }
   */
  createdAt,
  updatedAt,
}));

Proposals.publicFields = {
  _id: 1,
  statement: 1,
  upVoteAmount: 1,
  downVoteAmount: 1,
  createdAt: 1,
  updatedAt: 1,
};

Proposals.filterTypes = {
  NEWEST: 'newest',
  POPULAR: 'popular',
  ACTIVE: 'active',
  CONTROVERSIAL: 'controversial',
  DECIDED: 'decided',
  VALID: 'valid',
  INVALID: 'invalid',
};

Accounts.after.update(function(unusedUserId, doc) {
  if (!doc.balance && !this.previous.balance) return;
  const dBalance = doc.balance - this.previous.balance;
  Proposals
    .find({ [`votes.${doc._id}`]: { $exists: true } })
    .map(({ _id, votes }) =>
      Proposals.update(_id, {
        $inc: {
          [`${votes[doc._id].upVote ? 'up' : 'down'}VoteAmount`]: dBalance,
        },
      }));
});

let proposalCounter = 0;

Factory.define('proposal', Proposals, {
  statement: () =>
    `Proposal ${proposalCounter += 1}. Some long proposal text to be agreed or doubted`,
  votes() {
    this.upVoteAmount = 0;
    this.downVoteAmount = 0;
    return _.times(_.random(10, 100), () => undefined).reduce((p) => {
      const { _id: accountId, balance } = Factory.create('account');
      const upVote = Math.random() >= 0.5;
      this[upVote ? 'upVoteAmount' : 'downVoteAmount'] += balance;
      return ({ ...p, [accountId]: {
        signature: () => '0x' + Math.floor(Math.random() * Math.pow(2, 520)).toString(16).slice(0, 130),
        upVote,
        createdAt: new Date(),
      }});
    }, {});
  },
});
