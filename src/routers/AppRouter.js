import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/admin/DashboardPage';
import Matches from '../components/admin/Matches';
import AddEditMatch from '../components/admin/AddEditMatch';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home/Home';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <PublicRoute path="/login" component={LoginPage} exact={true} />
        <PrivateRoute path="/admin" component={DashboardPage} />
        <PrivateRoute path="/admin_matches/edit_match/" component={AddEditMatch} />
        <PrivateRoute path="/admin_matches/edit_match/:id" component={AddEditMatch} />
        <PrivateRoute path="/admin_matches" component={Matches} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
