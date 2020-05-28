import React, {Component} from 'react'
//import FirstStore from "./FirstStore"
import {connect} from "react-redux"
import Button from 'react-bootstrap/Button'
import { STPupdateKeystore } from '../actions/actions.js'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';

class AddWalletButton extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  onAddWalletB(event) {
    console.log('click onAddWalletB')
    event.preventDefault()
    window.open("/addwallet")
  }

  onOpenWalletB(event) {
    console.log('click onOpenWalletB')
    event.preventDefault()
    this.props.history.push('/openwallet')
    this.props.STPupdateKeystore(true)
  }

    render() {

        return (
            <div>
            <p>
                Hello {this.props.username} !
            </p>
            <Button variant="outline-primary"
            onClick={evt => this.onAddWalletB(evt)}>Create a New Wallet
            </Button>&nbsp;
            <Button variant="outline-primary"
            onClick={evt => this.onOpenWalletB(evt)}>Open existing Wallet
            </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    username: state.reducers.username,
    keystore: state.reducers.keystore,
})


export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      STPupdateKeystore,
    }
  )
)(AddWalletButton)
