import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

import {
  createdAt, updatedAt,
} from '../schema-helpers';

export const Proposals = new Mongo.Collection('proposals');

Proposals.attachSchema(new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  statement: { type: String },
  upVoteAmount: { type: SimpleSchema.Integer, defaultValue: 0 },
  downVoteAmount: { type: SimpleSchema.Integer, defaultValue: 0 },
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
