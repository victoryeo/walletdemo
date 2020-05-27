import Web3 from 'web3';
import { FirstStore } from '../store/FirstStore';

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED';

function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results,
  };
}

const getWeb3 = new Promise(resolve => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', dispatch => {
    let results;
    let { web3 } = window;
    console.log("web3 " + web3)
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);
      results = {
        web3Instance: web3,
      };
      resolve(FirstStore.dispatch(web3Initialized(results)));
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
      results = {
        web3Instance: web3,
      }
      resolve(FirstStore.dispatch(web3Initialized(results)));
    }
  })
})

export default getWeb3;

