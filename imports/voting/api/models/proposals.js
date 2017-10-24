import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { _ } from 'underscore';

import { createdAt, updatedAt } from '/imports/common/index';
import { Accounts } from '/imports/accounts/index';

export const Proposals = new Mongo.Collection('proposals');

Proposals.attachSchema(new SimpleSchema({
  _id: { type: String, optional: true, regEx: SimpleSchema.RegEx.Id },
  statement: { type: String },
  upVoteAmount: { type: Number, decimal: true, defaultValue: 0 },
  downVoteAmount: { type: Number, decimal: true, defaultValue: 0 },
  upVoteRatio: { type: Number, decimal: true, defaultValue: 0.5 },
  totalVoteAmount: { type: Number, decimal: true, defaultValue: 0 },
  popularScore: { type: Number, decimal: true, defaultValue: 0 },
  tags: {
    type: [String],
    autoValue() {
      return this.value
        ? Array.from(new Set(this.value.filter(t => Proposals.tags.includes(t))))
          .sort((a, b) => Proposals.tags.indexOf(a) - Proposals.tags.indexOf(b))
        : undefined;
    }
  },
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
  totalVoteAmount: 1,
  popularScore: 1,
  tags: 1,
  createdAt: 1,
  updatedAt: 1,
};

Proposals.sortTypes = {
  popular: { popularScore: -1 },
  newest: { createdAt: -1 },
};

Proposals.defaultSort = 'popular';

Proposals.tags = ['æternity', 'technical', 'design', 'politics', 'other'];

Proposals.defaultTag = 'all';

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
    `Proposal ${proposalCounter += 1}. Some long statement to be agreed or doubted`,
  tags: () => _.sample(Proposals.tags, _.random(0, 3)),
  votes() {
    this.upVoteAmount = 0;
    this.downVoteAmount = 0;
    const votes = _.times(_.random(10, 100), () => undefined).reduce((p) => {
      const { _id: accountId, balance } = Factory.create('account');
      const upVote = Math.random() >= 0.5;
      this[upVote ? 'upVoteAmount' : 'downVoteAmount'] += balance;
      return ({ ...p, [accountId]: {
        signature: () => '0x' + Math.floor(Math.random() * Math.pow(2, 520)).toString(16).slice(0, 130),
        upVote,
        createdAt: new Date(),
      }});
    }, {});
    this.totalVoteAmount = this.upVoteAmount + this.downVoteAmount;
    this.upVoteRatio = this.upVoteAmount / this.totalVoteAmount;
    return votes;
  },
});
