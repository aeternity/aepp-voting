import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import getAddressBySignature from '../../api/utils/getAddressBySignature';
import { adminLoginStatement } from '../../api/utils/genStatement';
import erc20contract, { decimals } from './tokenContract';

const suffixLength = (new Date()).toISOString().length;
const prefix = adminLoginStatement().slice(0, -suffixLength);

Accounts.registerLoginHandler('ethereum', ({ message, signature }) => {
  let address;
  try {
    address = getAddressBySignature(message, signature);
  } catch (e) {
    throw new Meteor.Error('invalid-signature');
  }
  if (
    !Meteor.settings.adminsAddresses.includes(address) &&
    !+erc20contract.balanceOf(address).shift(decimals.neg())
  ) {
    throw new Meteor.Error('no-tokens');
  }
  if (message.slice(0, -suffixLength) !== prefix) {
    throw new Meteor.Error('invalid-message');
  }
  if (new Date(message.slice(-suffixLength)) < Date.now() - (30 * 1000)) {
    throw new Meteor.Error('timeout');
  }

  return Accounts.updateOrCreateUserFromExternalService('ethereum', { id: address });
});
