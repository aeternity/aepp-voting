import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

import { createdAt, updatedAt, ethereumAddressType } from '/imports/common';

export const Accounts = new Mongo.Collection('accounts');

Accounts.schema = new SimpleSchema({
  _id: ethereumAddressType,
  balance: { type: Number },
  createdAt,
  updatedAt,
});

Accounts.attachSchema(Accounts.schema);

Factory.define('account', Accounts, {
  balance: () => Math.random() * 500,
});
