import ethereumjs from 'ethereumjs-util';

export const getEthereumAddress = (message, signature) => {
  const { sha3, ecrecover, pubToAddress } = ethereumjs;

  const r = new Buffer(signature.slice(2, 64 + 2), 'hex');
  const s = new Buffer(signature.slice(64 + 2, 128 + 2), 'hex');
  const v = parseInt(signature.slice(128 + 2), 16);
  const messageHash = sha3(`\x19Ethereum Signed Message:\n${message.length}${message}`);
  const publicKey = ecrecover(messageHash, v, r, s);
  return `0x${pubToAddress(publicKey).toString('hex')}`;
};
