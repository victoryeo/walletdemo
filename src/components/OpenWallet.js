import React, {Component} from 'react'
import {connect} from "react-redux"
import Button from 'react-bootstrap/Button'
//import keyStore from  '../containers/keystore'
import lightwallet from 'eth-lightwallet'
import localStore from 'store/dist/store.modern'
import { hdPathString, localStorageKey } from '../web3/constants'
import * as Utils from '../web3/utils'
import { STPupdateAccounts, STPupdateKeystore } from '../actions/actions.js'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';

export class OpenWallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      isLoaded: false,
      destination: 0x0,
      amount: 0,
      gas: 0,
    }
    console.log(this.props)
  }

  onLoad(event) {
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
    console.log(this.props)
    //this.props.location.name contains the cb function
    Utils.checkKeystore(true, this.props.location.name)
  }

  onSendEther(event) {
    event.preventDefault()
    console.log('SendEther', this.state.destination, this.state.amount,
      this.state.gas)

    let txObj = {
      from: this.props.location.account,
      to: this.state.destination,
      value: this.state.amount,
      gas: this.state.gas
    }
    let web3 =  this.props.location.web3.web3Instance
    let transferEth
    transferEth = async() => {
      console.log('transfer eth')
      try {
        const resp = await web3.eth.sendTransaction(txObj)
      } catch (err) {
        console.log(err)
      }
    }
    transferEth()
  }

  updatePass(event) {
    this.setState({
      password: event.target.value
    })
  }

  updateDest(event) {
    this.setState({
      destination: event.target.value
    })
  }

  updateGas(event) {
    this.setState({
      gas: event.target.value
    })
  }

  updateAmount(event) {
    this.setState({
      amount: event.target.value
    })
  }

  goBack(event){
    event.preventDefault()
      //console.log(this.props)
      this.props.history.goBack();
  }

  componentDidMount() {
    console.log(this.props.location.name)
    console.log(this.props.location.account)
    console.log(this.props.location.web3)
    const { match } = this.props
    console.log(match)
  }

    render() {
        return (
            <div>
            {this.state.isLoaded
              ?
              <div>
              <br/>
              <table>
              <tbody>
              <tr>
              <td>&nbsp;</td>
              <td>Wallet is loaded</td>
              </tr>
              <tr>
              <td>&nbsp;</td>
              </tr>
              <tr>
              <td>&nbsp;</td>
              <td>
              <form>
                  <label className="walletlabel"> Destination address:
                  <input className="walletinput" type="text" id="destination"
                    required onChange={evt => this.updateDest(evt)}>
                  </input></label><br/>
                  <label className="walletlabel"> Amount:
                  <input className="walletinput" type="text" id="amount"
                     required onChange={evt => this.updateAmount(evt)}>
                  </input></label><br/>
                  <label className="walletlabel"> Gas Price (Gwei):
                  <input className="walletinput" type="text" id="gas"
                     required onChange={evt => this.updateGas(evt)}>
                  </input></label><br/>
                  <button className='button-submit'
                  onClick={evt => this.onSendEther(evt)}>Send Ether</button>
              </form>
              </td>
              </tr>
              </tbody>
              </table>
              </div>
              :
              <table>
              <tbody>
              <tr>
              <td>&nbsp;</td>
              <td>
              <form>
                  <label for="pass">  Key in your password to load existing wallet<br/>
                   (4 characters minimum):</label><br/>
                  <input type="password" id="pass" name="password"
                    minLength="4" required onChange={evt => this.updatePass(evt)}>
                  </input>
                  <button className='button-submit'
                  onClick={evt => this.onLoad(evt)}>Load</button>
              </form>
              </td>
              </tr>
              </tbody>
              </table>
            }<br/>
            <table>
            <tbody>
            <tr>
            <td>&nbsp;</td>
            <td><button onClick={evt => this.goBack(evt)}>Go Back</button></td>
            </tr>
            </tbody>
            </table>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    keystore: state.reducers.keystore,
})

export default
  withRouter(
  connect(
    mapStateToProps,
    {
      STPupdateAccounts,
      STPupdateKeystore,
    }
  )
)(OpenWallet)
