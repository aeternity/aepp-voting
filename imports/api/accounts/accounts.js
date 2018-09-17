import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import { createdAt, updatedAt, ethereumAddressType } from '../utils/schema-helpers';

export const Accounts = new Mongo.Collection('accounts');

Accounts.schema = new SimpleSchema({
  _id: ethereumAddressType,
  balance: { type: Number, decimal: true },
  createdAt,
  updatedAt,
});

Accounts.attachSchema(Accounts.schema);

Factory.define('account', Accounts, {
  balance: () => Math.random() * 5000,
});
