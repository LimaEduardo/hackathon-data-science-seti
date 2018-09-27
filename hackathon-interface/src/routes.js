import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Discovery from './Containers/Discovery'

const Routes = () => (
  <Switch>
    <Route exact path="/discovery" component={Discovery} />
  </Switch>
)

export default Routes