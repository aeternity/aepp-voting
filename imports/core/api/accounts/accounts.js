import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { createdAt, updatedAt, ethereumAddressType } from '../schema-helpers';

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
