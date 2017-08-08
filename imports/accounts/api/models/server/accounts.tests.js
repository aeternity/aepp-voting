import { describe, it } from 'meteor/practicalmeteor:mocha';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';

describe('accounts', () => {
  it('builds correctly from factory', () => {
    const account = Factory.create('account');
    expect(account).to.be.an('object');
    expect(account._id).to.be.an('string');
    expect(account.balance).to.be.an('number');
    expect(account.createdAt).to.be.an.instanceof(Date);
  });
});
