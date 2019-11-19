import React from 'react';
import RFIModel from '../RFIModel';
import classNames from 'classnames';
import styled from 'styled-components';
import { StyledRFIRegionDivider } from '../rfi-table/RFIRegionDivider';
import { StyledRFIRowOpen } from './row--open/RFIRowOpen';

interface Props {
  rfis: RFIModel[];
  className?: string;
}

function displayMessageOrDataForOpenRegion(rfis: RFIModel[]) {
  const rfisComplete = () => {
    return rfis && rfis.filter(function (rfis) {return rfis.status === "OPEN"; }).length === 0
  };

  if (rfisComplete()) {
    return displayCompletedRFIsMessage();
  }
  if (rfis) {
    return displayRFIsAsRows(rfis);
  }
  return;
}

function displayCompletedRFIsMessage() {
  return (
    <div
      className={classNames('confirmation-message')}
    >
      No Open found
    </div>
  );
}

function displayRFIsAsRows(rfis: RFIModel[]) {
  return (
    rfis.filter(function (rfis) {return rfis.status === "OPEN"; })
      .sort(function(a, b) {
        if (a.ltiov == 0)
          return 1;
        if (b.ltiov == 0)
          return -1;
        return a.ltiov < b.ltiov ? -1 : 1})
      .map((rfi: RFIModel, index: any) => {
      return (<StyledRFIRowOpen rfi={rfi} index={index} key={`${index}`}/>);
    })
  )
}

function determineTransparency(rfis: RFIModel[]) {
  if (rfis && rfis.length === 0) {
    return 'transparent';
  }
  return '';
}

export const RegionForOpen: React.FC<Props> = props => {
  return (
    <div className={classNames('region', 'region--open', props.className)}>
      <StyledRFIRegionDivider className={determineTransparency(props.rfis)} regionTitle={"OPEN"}/>
      {displayMessageOrDataForOpenRegion(props.rfis)}
    </div>
  )
};

export const StyledRegionForOpen = styled(RegionForOpen)`
  .confirmation-message {
    color: ${(props) => props.theme.color.fontPrimary};
    font-family: ${(props) => props.theme.font.familyRegion};
    font-weight: ${(props) => props.theme.font.weightRegion};
    font-size: ${(props) => props.theme.font.sizeRegion};
    width: 272px;
    margin-top: 16px;
    text-align: center;
    opacity: 50%;
  }
  
  .transparent {
    opacity: 25%;
  }
`;
