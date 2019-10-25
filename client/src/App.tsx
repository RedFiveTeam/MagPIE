import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import MainPageContainer from './page/MainPageContainer';
import RFIContainer from './rfi/RFIContainer';
// import MapContainer from './map/MapContainer';

interface Props {
  className?: string;
}

const App: React.FC<Props> = props => {
  const {className} = props;
  return (
    <div className={classNames('app', className)}>
      <MainPageContainer/>
      <RFIContainer/>
    </div>
  );
};

export default styled(App)``;
