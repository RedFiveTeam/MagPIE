import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { History } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApplicationState } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { StyledDashboardContainer } from './dashboard/DashboardContainer';
import { StyledMetricsContainer } from './dashboard/metric/MetricsContainer';
import { Store } from 'redux';
import theme from './resources/theme';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
  className?: string;
}

const snackbarStyle = makeStyles((localTheme) =>
  createStyles({
    snackbar: {
      backgroundColor: theme.color.backgroundSnackbar,
      color: theme.color.fontSnackbar,
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
                <Route exact path={'/'} component={StyledDashboardContainer}/>
                <Route exact path={'/metrics'} component={StyledMetricsContainer}/>
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
