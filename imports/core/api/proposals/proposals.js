import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'

export const Proposals = new Mongo.Collection('proposals');

const proposalsType = new SimpleSchema({
  title: {
    type: 'String',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  total: {
    type: Number,
  },
  agreed: {
    type: Number,
  },
  doubt: {
    type: Number,
  },
});

Proposals.attachSchema(proposalsType);
