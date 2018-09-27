import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Descobrir from './Containers/Descobrir'

const Routes = () => (
  <Switch>
    <Route exact path="/descobrir" component={Descobrir} />
  </Switch>
)

export default Routes