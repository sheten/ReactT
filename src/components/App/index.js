import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import WeeklyGraphics from "../GraphsWeekly";
import MonthlyGraphics from "../GraphsMonthly";
import InsertQuestions from "../InsertQuestions";
import Pool from "../Pool";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.HOME} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.WEEKLYGRAPHS} component={WeeklyGraphics} />
      <Route exact path={ROUTES.MONTHLYGRAPHS} component={MonthlyGraphics} />
      <Route exact path={ROUTES.INSERTQUESTIONS} component={InsertQuestions} />
      <Route exact path={ROUTES.POOL} component={Pool} />
    </div>
  </Router>
);

export default withAuthentication(App);
