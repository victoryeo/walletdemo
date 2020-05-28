import React, {Component} from 'react'
import {connect} from "react-redux"
import Button from 'react-bootstrap/Button'
//import keyStore from  '../containers/keystore'
import lightwallet from 'eth-lightwallet'
import localStore from 'store/dist/store.modern'
import { hdPathString, localStorageKey } from '../web3/constants'

export class OpenWallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      isLoaded: false
    }
  }

  onSubmit(event) {
    event.preventDefault()
    console.log('complete', this.state.password)
    this.setState({
      isLoaded: true
    })

    const walletdump = localStore.get(localStorageKey);
    if (!walletdump) {
      throw new Error('No keystore found in localStorage');
    }
    console.log(`Load len: ${JSON.stringify(walletdump).length}`);

    const ksDump = walletdump.ks;
    const ks = lightwallet.keystore.deserialize(ksDump);
    console.log(ks)
  }

  updatePass(event) {
    this.setState({
      password: event.target.value
    })
    console.log('updatePass', this.state.password)
  }
    render() {
        return (
            <div>
            <table>
            <tbody>
            <tr>
            <td>&nbsp;</td>
            <td>
            <form onSubmit={this.transaction}>
                <label for="pass">  Key in your password to load existing wallet<br/>
                 (4 characters minimum):</label><br/>
                <input type="password" id="pass" name="password"
                  minLength="4" required onChange={evt => this.updatePass(evt)}>
                </input>
                <button className='button-submit'
                onClick={evt => this.onSubmit(evt)}>Load</button>
            </form>
            </td>
            </tr>
            </tbody>
            </table>
            {this.state.isLoaded?'Wallet is loaded':''}<br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    username: state.reducers.username,
})

export default connect(mapStateToProps)(OpenWallet)
