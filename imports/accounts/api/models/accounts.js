import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

import { createdAt, updatedAt, ethereumAddressType } from '/imports/core';

export const Accounts = new Mongo.Collection('accounts');

Accounts.schema = new SimpleSchema({
  _id: ethereumAddressType,
  balance: { type: SimpleSchema.Integer },
  createdAt,
  updatedAt,
});

Accounts.attachSchema(Accounts.schema);

Factory.define('account', Accounts, {
  balance: () => Math.round(Math.random() * 500),
});

Factory.define('account', Accounts, {
  balance: () => Math.round(Math.random() * 500),
});
