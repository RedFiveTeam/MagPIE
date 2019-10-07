import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import MapContainer from './map/MapContainer';
import MainPageContainer from './page/MainPageContainer';

interface Props {
  className?: string;
}

const App: React.FC<Props> = props => {
  const {className} = props;
  return (
    <div className={classNames('app', className)}>
      <MainPageContainer/>
      <MapContainer/>
    </div>
  );
};

export default styled(App)``;
