import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from 'components/NavBar';
import Courses from 'containers/Courses';
import HomePage from 'containers/HomePage';
import CoursePage from 'containers/Course';
import ProfilePage from 'containers/Profile';
import NotFoundPage from 'containers/NotFound';
import FirstSignIn from 'containers/FirstSignIn';
import { AuthContext } from 'contexts/auth_context';
import LeaveFeedback from 'containers/LeaveFeedback';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

import { isValid } from 'helpers/user_helper';

const App = props => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBar {...props} />
      <div className={props.classes.main}>
        {!isValid(user) ? (
          <FirstSignIn />
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/:id" component={CoursePage} />
            <Route exact path="/review" component={LeaveFeedback} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(App);
