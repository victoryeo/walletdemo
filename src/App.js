import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import Web3Info from "./components/Web3Info"
import DisplayHello from "./components/DisplayHello"
import AddWalletButton from "./components/AddWalletButton"
import getWeb3 from './web3/getWeb3'
import * as Utils from './web3/utils'

getWeb3.catch(
  err => console.warn('Error in web3 initialization.', err)
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
	     isConnected: false,
	     account: ''
    };
    this.web3 = null
    //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    console.log("App web3")
  }

  componentDidMount() {
    if (this.web3) {
      let accounts = this.web3.eth.getAccounts()
      this.setState({
	      isConnected: true,
	      account: accounts[0]
      });
    }
  }

  render() {
    console.log(this.state.account)
    return (
      <div>
        <Web3Info />
        <AddWalletButton />
      </div>
    );
  }
}

export default connect(null)(App);
//export default App;
