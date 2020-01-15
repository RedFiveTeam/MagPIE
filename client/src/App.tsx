import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StyledWorkflowContainer } from './workflow/WorkflowContainer';
import { StyledMetricsContainer } from './metrics/MetricsContainer';

interface Props {
  className?: string;
}

class App extends React.Component<Props, any> {
  render() {
    return (
      <Router>
        <div className={classNames('app', this.props.className)}>
          <Switch>
          <Route exact path={'/'} component={StyledWorkflowContainer}/>
          <Route exact path={'/metrics'} component={StyledMetricsContainer}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default styled(App)`
  height: 100vh;
  background-color: ${(props) => props.theme.color.backgroundBase};
`;


