import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { History } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApplicationState } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { StyledDashboardContainer } from './dashboard/DashboardContainer';
import { Store } from 'redux';
import theme from './resources/theme';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { useCookies } from 'react-cookie';
import { StyledMetricsDashboard } from './dashboard/metric/MetricsDashboard';

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
  className?: string;
}

const snackbarStyle = makeStyles((localTheme) =>
  createStyles({
    snackbar: {
      backgroundColor: theme.color.backgroundSnackbar,
      color: theme.color.fontActive,
      fontSize: theme.font.sizeRow,
      fontFamily: theme.font.familyRow,
      fontWeight: theme.font.weightRow,
    },
  }),
);

const App: React.FC<AppProps> = ({store, history, className}) => {
  const moment = require('moment-timezone');
  moment.tz.setDefault('Etc/UTC');
  const classes = snackbarStyle();

  const [userCookie] = useCookies(['username']);

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={15000}
      classes={{
        variantInfo: classes.snackbar,
      }}
      hideIconVariant
    >
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router>
            <div className={classNames('app', className)}>
              <Switch>
                <Route exact path={'/'}
                       render={(props) =>
                         <StyledDashboardContainer {...props} user={userCookie.username}/>}
                />
                <Route exact path={'/metrics'} component={StyledMetricsDashboard}/>
              </Switch>
            </div>
          </Router>
        </ConnectedRouter>
      </Provider>
    </SnackbarProvider>
  );
};

export default styled(App)`
  height: 100vh;
  background-color: ${theme.color.backgroundBase};
`;
