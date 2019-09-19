import React from 'react';
import MainPageContainer from './page/MainPageContainer';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const App: React.FC<Props> = props => {
  const {className} = props;
  return (
    <div className={classNames('app', className)}>
      <MainPageContainer/>
    </div>
  );
};

export default styled(App)``;
