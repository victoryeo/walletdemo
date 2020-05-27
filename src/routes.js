import React from "react"
import { Route, Switch } from "react-router-dom"
import { AddWallet } from "./components/AddWallet"
import { NotFound } from "./components/NotFound"
import { App } from "./App"

const Routes = () => {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={App} />
      <Route path="/addwallet" component={AddWallet} />
      <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default Routes
