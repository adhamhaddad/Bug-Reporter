import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProfilePage from '../pages/profile';
import ReportIssuePage from '../pages/report-issue';
const Routes = () => (
  <Switch>
    <Route exact path='/my-account' component={ProfilePage} />
    <Route exact path='/my-view' component={ProfilePage} />
    <Route exact path='/view-issues' component={ProfilePage} />
    <Route exact path='/report-issue' component={ReportIssuePage} />
  </Switch>
);

export default Routes;
