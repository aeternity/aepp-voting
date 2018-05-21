import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { getEthereumAddress } from '../../api/utils/signature';
import { adminLoginStatement } from '../../api/utils/genStatement';
import erc20contract from './tokenContract';

const suffixLength = (new Date()).toISOString().length;
const prefix = adminLoginStatement().slice(0, -suffixLength);

Accounts.registerLoginHandler('ethereum', ({ message, signature }) => {
  let address;
  try {
    address = getEthereumAddress(message, signature);
  } catch (e) {
    throw new Meteor.Error('invalid-signature');
  }
  if (
    !Meteor.settings.adminsAddresses.includes(address) &&
    !+erc20contract.balanceOf(address).shift(erc20contract.decimals().neg())
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
