import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import RMDashboardContainer from './rm-dashboard/RMDashboardContainer';
import MetricsContainer from './metrics/MetricsContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

interface Props {
  className?: string;
}

class App extends React.Component<Props> {
  render() {
    return (
      <Router>
        <div className={classNames('app', this.props.className)}>
          <Switch>
          <Route exact path={'/'} component={RMDashboardContainer}/>
          <Route exact path={'/metrics'} component={MetricsContainer}/>
          </Switch>
        </div>
      </Router>
    )
  }
};

export default styled(App)`
  height: 100vh;
  background-color: ${(props) => props.theme.color.backgroundBase};
`;


