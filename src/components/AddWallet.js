import React, {Component} from 'react'
//import FirstStore from "./FirstStore"
import {connect} from "react-redux"
import Button from 'react-bootstrap/Button'
//import keyStore from  '../containers/keystore'
import lightwallet from 'eth-lightwallet'

const hdPathString = `m/44'/60'/0'/0`

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
    seedPhrase = lightwallet.keystore.generateRandomSeed(password);
    console.log(seedPhrase)
    const opt = {
      password,
      seedPhrase,
      hdPathString,
    };
    lightwallet.keystore.createVault(opt, (err, data) => {
      console.log('createVault')
      console.log(data)
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
            <tr>
            <td>&nbsp;</td>
            <td>
            <form onSubmit={this.transaction}>
                <label for="pass">  Key in your password for the new wallet<br/>
                 (4 characters minimum):</label><br/>
                <input type="password" id="pass" name="password"
                  minlength="4" required onChange={evt => this.updatePass(evt)}>
                </input>
                <button className='button-submit'
                onClick={evt => this.onSubmit(evt)}>Generate</button>
            </form>
            </td>
            </tr>
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
