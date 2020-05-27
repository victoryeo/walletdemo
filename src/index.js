import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import Routes from "./routes"
import { Router } from "react-router-dom"
import createHistory from 'history/createBrowserHistory'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { FirstStore } from './store/FirstStore'

const history = createHistory()

ReactDOM.render(
  <Router history={history}>
  <React.StrictMode>
    <Provider store={FirstStore}>
       <Routes />
    </Provider>
  </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
