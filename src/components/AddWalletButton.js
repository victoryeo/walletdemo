import React, {Component} from 'react'
//import FirstStore from "./FirstStore"
import {connect} from "react-redux"
import Button from 'react-bootstrap/Button'

class AddWalletButton extends Component {
  onAddWalletB(event) {
    console.log('click onAddWalletB')
    event.preventDefault()
    window.open("/addwallet")
  }

  onOpenWalletB(event) {
    console.log('click onOpenWalletB')
    event.preventDefault()
    window.open("/openwallet")
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

})

export default connect(mapStateToProps)(AddWalletButton)
