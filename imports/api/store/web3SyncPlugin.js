import web3 from './web3';

export default (store) => {
  const setAccountId = (accountId) => {
    if (accountId !== store.state.accountId) {
      store.commit('setAccountId', accountId);
    }
  };

  const setCanSignByWeb3 = (canSignByWeb3) => {
    if (canSignByWeb3 !== store.state.canSignByWeb3) {
      store.commit('setCanSignByWeb3', canSignByWeb3);
    }
  };

  setInterval(() => {
    web3.eth.getAccounts((error, accounts) => {
      if (error) {
        setCanSignByWeb3(false);
      } else {
        if (accounts[0]) setAccountId(accounts[0]);
        setCanSignByWeb3(!!accounts[0]);
      }
    });
  }, 500);
};
