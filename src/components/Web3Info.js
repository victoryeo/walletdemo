import React, {Component} from 'react';
//import FirstStore from "./FirstStore"
import {connect} from "react-redux";
import * as Utils from '../web3/utils'
import { STPupdateTotalBalance, STPupdateAccounts } from '../actions/actions.js'

class Web3Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
	     isConnected: false,
	     account: ''
    };
    this.web3 = null
    this.networktype = 'none'
    //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    console.log("App web3")
    console.log(this.props)
    const web3Returned = setInterval(() => {
      if (this.props.web3 != null) {
	      clearInterval(web3Returned);
        this.web3 = this.props.web3.web3Instance;
        console.log(this.web3)
        Utils.checkNetwork(this.web3).then((res) => {
            console.log(res)
            if (res == 'local') {
              this.setState({
                   isConnected: true,
             })
            }
        })
	      try {
          Utils.checkBalance(this.web3, this.props.STPupdateAccounts, this.props.STPupdateTotalBalance);
	        console.log(this.props.totalBalance)
		      console.log(this.props.account)
        } catch (err) {
          console.error('error', err);
        }
	      try {
          this.web3.eth.subscribe('newBlockHeaders', (err, res) => {
		      console.log(res)
		      console.log(err)
	      }).on("data", (blockHeader) => {
	        console.log(blockHeader)
	      }).on("error", console.error)
	      } catch (err) {
	        console.error('error', err);
	      }
      }
    },1000)
  }

    render() {
        return (
          <div>
          <h2>Ethereum Wallet demo</h2><br/>
          {this.state.isConnected?'Connected to local node':'Not Connected'}<br/>
          Account is {this.props.account}<br/>
          Balance is {this.props.totalBalance}<br/>
          {this.props.keystore
          ?
          <div>
          <br/>
          <label>Wallet loaded </label>
          <table>
          <tbody>
          <tr>
          <td>&nbsp;</td>
          <td>
          <form onSubmit={this.transaction}>
              <label>  Destination address
              </label>
              <input type="destination" id="destination" name="destination"
                required>
              </input><br/>
              <label>  Amount
              </label>
              <input type="amount" id="amount" name="amount"
                required>
              </input><br/>
              <label>  Gas Price (Gwei)
              </label>
              <input type="gas" id="gas" name="gas"
                required>
              </input><br/>
              <button className='button-submit'
              onClick={evt => this.onSubmit(evt)}>Send</button>
          </form>
          </td>
          </tr>
          </tbody>
          </table>
          </div>
          :'Wallet not loaded'}<br/>
          </div>
        );
    }
}

const mapStateToProps = state => ({
        web3: state.web3,
        totalBalance: state.reducers.totalBalance,
        account: state.reducers.account,
        keystore: state.reducers.keystore,
})

export default connect(
  mapStateToProps,
  {
    STPupdateAccounts,
    STPupdateTotalBalance,
  }
)(Web3Info);
