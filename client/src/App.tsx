import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import { History } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApplicationState} from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { StyledWorkflowContainer } from './dashboard/DashboardContainer';
import { StyledMetricsContainer } from './dashboard/metric/MetricsContainer';
import { Store } from 'redux';

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


