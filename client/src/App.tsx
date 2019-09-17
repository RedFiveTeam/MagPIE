import React from 'react';
import MainPageContainer from './title-manipulator/MainPageContainer';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const App: React.FC<Props> = props => {
  const {className} = props;
  return (
    <div className={classNames('app', className)}>
      A DGS-1 Pie webapp under construction
      <MainPageContainer/>
    </div>
  );
};

export default styled(App)``;
