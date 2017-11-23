import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/routes_util';
import HeaderContainer from './header/header_container';
import LoginContainer from './users/login_container';
import SignupContainer from './users/signup_container';
import DataImportPage from './data/data_import_page';
import DataShowPage from './data/data_show_page';
import ProfilePageContainer from './users/profile_page_container';
import DatasetIndex from './data/datasets_index/datasets_index_container';
import Footer from './footer/footer';

const App = () => (
  <div className="app">
    <Route path="/" component={HeaderContainer} />
    <Switch>
      <ProtectedRoute exact path="/" component={() => <h1>Feed</h1>} />
      <ProtectedRoute path="/feed" component={() => <h1>Feed</h1>} />
      <ProtectedRoute exact path="/datasets" component={DatasetIndex} />
      <ProtectedRoute path="/datasets/new" component={DataImportPage} />
      <ProtectedRoute path="/datasets/:id" component={DataShowPage} />
      <ProtectedRoute path="/users/:id" component={ProfilePageContainer} />
      <AuthRoute path="/login" component={LoginContainer} />
      <AuthRoute path="/signup" component={SignupContainer} />
    </Switch>
    <Route path="/" component={Footer} />
  </div>
);

export default App;
