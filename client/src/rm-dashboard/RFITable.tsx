import * as React from 'react';
import styled from 'styled-components';
import RFIModel from './RFIModel';
import classNames from 'classnames';
import { StyledRegionForPending } from './RegionForPending';
import { StyledRFITableHeader } from './RFITableHeader';

interface Props {
  rfis: RFIModel[];
  className?: string;
}

export const RFITable: React.FC<Props> = props => {
  return (
    <div className={classNames('rfi-table', props.className)}>
      <StyledRFITableHeader/>
      <StyledRegionForPending rfis={props.rfis}/>
    </div>
  );
};

export const StyledRFITable = styled(RFITable)``;
