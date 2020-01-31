import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Store } from 'redux';
import { History } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StyledWorkflowContainer } from './workflow/WorkflowContainer';
import { StyledMetricsContainer } from './metrics/MetricsContainer';
import { ApplicationState } from './state';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
  className?: string;
}

const App: React.FC<AppProps> = ({store, history, className}) => {
  const moment = require('moment-timezone');
  moment.tz.setDefault("Etc/UTC");
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router>
          <div className={classNames('app', className)}>
            <Switch>
              <Route exact path={'/'} component={StyledWorkflowContainer}/>
              <Route exact path={'/metrics'} component={StyledMetricsContainer}/>
            </Switch>
          </div>
        </Router>
      </ConnectedRouter>
    </Provider>
  )
};

export default styled(App)`
  height: 100vh;
  background-color: ${(props) => props.theme.color.backgroundBase};
`;


