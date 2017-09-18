import ethereumjs from 'ethereumjs-util';

export const getEthereumAddress = (message, signature) => {
  const { sha3, ecrecover, pubToAddress } = ethereumjs;

  const r = new Buffer(signature.slice(2, 64 + 2), 'hex');
  const s = new Buffer(signature.slice(64 + 2, 128 + 2), 'hex');
  const v = parseInt(signature.slice(128 + 2), 16);
  const publicKey = ecrecover(sha3(message), v, r, s);
  return `0x${pubToAddress(publicKey).toString('hex')}`;
};
