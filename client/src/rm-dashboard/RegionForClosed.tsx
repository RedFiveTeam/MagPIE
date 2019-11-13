import RFIModel from './RFIModel';
import classNames from 'classnames';
import { StyledRFIRowClosed } from './row--closed/RFIRowClosed';
import React from 'react';
import { StyledRFIRegionDivider } from './RFIRegionDivider';
import styled from 'styled-components';

interface Props {
  rfis: RFIModel[];
  className?: string;
}

function displayMessageOrDataForClosedRegion(rfis: RFIModel[]) {
  const rfisComplete = () => {
    return rfis && rfis.filter(function (rfis) {return rfis.status === "CLOSED"; }).length === 0
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
      No Closed found
    </div>
  );
}

function displayRFIsAsRows(rfis: RFIModel[]) {
  return (
    rfis.filter(function (rfis) {return rfis.status === "CLOSED"; }).map((rfi: RFIModel, index: any) => {
      return (<StyledRFIRowClosed rfi={rfi} index={index} key={`${index}`}/>);
    })
  )
}

function determineTransparency(rfis: RFIModel[]) {
  if (rfis && rfis.length === 0) {
    return 'transparent';
  }
  return '';
}


export const RegionForClosed: React.FC<Props> = props => {
  return (
    <div className={classNames('region', 'region--closed', props.className)}>
      <StyledRFIRegionDivider className={determineTransparency(props.rfis)} regionTitle={"CLOSED"} />
      {displayMessageOrDataForClosedRegion(props.rfis)}
    </div>
  )
};

export const StyledRegionForClosed = styled(RegionForClosed)`
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
