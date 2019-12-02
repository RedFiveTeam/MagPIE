import * as React from 'react';
import styled from 'styled-components';
import RFIModel from '../RFIModel';
import classNames from 'classnames';
import { StyledRFITableHeader } from './RFITableHeader';
import ScrollShadow from 'react-scroll-shadow';
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

function pendingRFIs(rfis: RFIModel[]) {
  return rfis.map((rfi: RFIModel, index: number) =>
    <PendingRFIRow rfi={rfi} key={index}/>
  );
}

function openRFIs(rfis: RFIModel[]) {
  return rfis.map((rfi: RFIModel, index: number) =>
    <OpenRFIRow rfi={rfi} key={index}/>
  )
}

function closedRFIs(rfis: RFIModel[]) {
  return rfis.map((rfi: RFIModel, index: number) =>
    <ClosedRFIRow rfi={rfi} key={index}/>
  );
}

export const RFITable: React.FC<Props> = props => {
  return (
    <div className={classNames('rfi-table', props.className)}>
      <StyledRFITableHeader/>
      <div className={'rfi-table--body'}>
        <ScrollShadow
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
            {pendingRFIs(props.pendingRfis)}
          </StyledRegion>
          <StyledRegion
            title={'open'}
            emptyMessage={'No Open found'}
          >
            {openRFIs(props.openRfis)}
          </StyledRegion>
          <StyledRegion
            title={'closed'}
            emptyMessage={''}
          >
            {closedRFIs(props.closedRfis)}
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
  
  .rfi-table--body{
    overflow-y: scroll; 
    display: flex;
    margin-bottom: 48px;
  }
`;
