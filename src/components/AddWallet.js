import React, {Component} from 'react'
import {connect} from "react-redux"
import Button from 'react-bootstrap/Button'
//import keyStore from  '../containers/keystore'
import lightwallet from 'eth-lightwallet'
import localStore from 'store/dist/store.modern'

/* Default HD path string for key generation from seed */
const hdPathString = `m/44'/60'/0'/0`
/* keystore will be saved to local storage under this key */
export const localStorageKey = 'ks';

export class AddWallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      isGenerated: false
    }
  }

  onSubmit(event) {
    event.preventDefault()
    console.log('complete', this.state.password)
    this.setState({
      isGenerated: true
    })

    let seedPhrase = ""
    let password = this.state.password
    let ks = {}
    seedPhrase = lightwallet.keystore.generateRandomSeed(password);
    console.log(seedPhrase)
    const opt = {
      password,
      seedPhrase,
      hdPathString,
    };
    lightwallet.keystore.createVault(opt, (err, data) => {
      console.log('createVault')
      ks = data
      console.log(ks)
      const walletdump = {
        ver: '1',
        ks: ks.serialize(),
      }
      console.log(walletdump)
      localStore.set(localStorageKey, walletdump)
    })
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
                <label for="pass">  Key in your password for the new wallet<br/>
                 (4 characters minimum):</label><br/>
                <input type="password" id="pass" name="password"
                  minLength="4" required onChange={evt => this.updatePass(evt)}>
                </input>
                <button className='button-submit'
                onClick={evt => this.onSubmit(evt)}>Generate</button>
            </form>
            </td>
            </tr>
            </tbody>
            </table>
            {this.state.isGenerated?'New Wallet is generated':''}<br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    username: state.reducers.username,
})

export default connect(mapStateToProps)(AddWallet)
