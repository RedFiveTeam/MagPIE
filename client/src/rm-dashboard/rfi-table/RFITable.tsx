import * as React from 'react';
import styled from 'styled-components';
import RFIModel from '../RFIModel';
import classNames from 'classnames';
import { StyledRFITableHeader } from './RFITableHeader';
import ScrollShadow from './scroll-shadow';
import theme from '../../styles/theme';
import { StyledRegion } from './Region';
import { ClosedRFIRow, OpenRFIRow, PendingRFIRow } from './RFIRow';
import { connect } from 'react-redux';

interface Props {
  pendingRfis: RFIModel[];
  openRfis: RFIModel[];
  closedRfis: RFIModel[];
  className?: string;
}

function pendingRFIs(rfis: RFIModel[], scrollRegionRef: any) {
  return rfis.map((rfi: RFIModel, index: number) =>
    <PendingRFIRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef}/>
  );
}

function openRFIs(rfis: RFIModel[], scrollRegionRef: any) {
  return rfis.map((rfi: RFIModel, index: number) =>
    <OpenRFIRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef}/>
  )
}

function closedRFIs(rfis: RFIModel[], scrollRegionRef: any) {
  return rfis.map((rfi: RFIModel, index: number) =>
    <ClosedRFIRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef}/>
  );
}

export const RFITable: React.FC<Props> = props => {
  let scrollRegionRef = React.createRef();

  return (
    <div className={classNames('rfi-table', props.className)}>
      <StyledRFITableHeader/>
      <div className={'rfi-table--body'}>
        <ScrollShadow
          scrollRef={scrollRegionRef}
          bottomShadowColors={{
            active: 'linear-gradient(to top, #000000 0%, #00000000 100%);',
            inactive: theme.color.backgroundBase
          }}
          topShadowColors={{
            active: 'linear-gradient(to bottom, #000000 0%, #00000000 100%);',
            inactive: theme.color.backgroundBase
          }}
          shadowSize={10}
        >
          <StyledRegion
            title={'pending'}
            emptyMessage={'Congratulations! Your team opened all the new RFIs in GETS.'}
          >
            {pendingRFIs(props.pendingRfis, scrollRegionRef)}
          </StyledRegion>
          <StyledRegion
            title={'open'}
            emptyMessage={'No Open found'}
          >
            {openRFIs(props.openRfis, scrollRegionRef)}
          </StyledRegion>
          <StyledRegion
            title={'closed'}
            emptyMessage={''}
          >
            {closedRFIs(props.closedRfis, scrollRegionRef)}
          </StyledRegion>
        </ScrollShadow>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  pendingRfis: state.pendingRfis,
  openRfis: state.openRfis,
  closedRfis: state.closedRfis
});

const mapDispatchToProps = {};

export const StyledRFITable = styled(
  connect(mapStateToProps, mapDispatchToProps)(RFITable))`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  
  .rfi-table--body{
    overflow-y: auto; 
    display: flex;
    margin-bottom: 48px;
  }
`;
