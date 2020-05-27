import React, {Component} from 'react'
//import FirstStore from "./FirstStore"
import {connect} from "react-redux"
import Button from 'react-bootstrap/Button'

export class AddWallet extends Component {
    render() {
        return (
            <div>
            <p>
                <label for="pass">  Key in your password to for the new wallet
                 (4 characters minimum):</label><br/>
                 <input type="password" id="pass" name="password"
                  minlength="4" required></input>
            </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({

        username: state.reducers.username,

})

export default connect(mapStateToProps)(AddWallet)
