export function checkBalance(web3, STPupdateAccounts, STPupdateTotalBalance) {
  try {
    let totalBalance = 0;
    web3.eth.getAccounts().then(accounts => {
      STPupdateAccounts(accounts[0])
      console.log(accounts[0])
        web3.eth.getBalance(accounts[0]).then(balance => {
          totalBalance += Number(balance);
          STPupdateTotalBalance(totalBalance)
          console.log(totalBalance)
        });
    });
  } catch (err) {
    console.warn('web3 provider not open');
    return err;
  }
}

export async function checkNetwork(web3) {
  try {
    return web3.eth
      .getBlock(0)
      .then(block => {
        console.log(block.hash)
        switch (block.hash) {
          case '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3':
            return 'main';
          case '0x6341fd3daf94b748c72ced5a5b26028f2474f5f00d824504e4fa37a75767e177':
            return 'rinkeby';
          case '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d':
            return 'ropsten';
          case '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9':
            return 'kovan';
          default:
            return 'local';
        }
      })

  } catch (err) {
    console.warn('web3 provider not open');
    return "none";
  }
}

export function checkKeystore(ks, STPupdateKeystore) {
  try {
      console.log(ks)
      STPupdateKeystore(ks)
  } catch (err) {
    console.log(err)
    console.warn('keystore not open');
    return err;
  }
}
