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
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorderRfis } from '../RFIActions';
import { Field, SortKey } from '../SortKey';

interface Props {
  pendingRfis: RFIModel[];
  openRfis: RFIModel[];
  closedRfis: RFIModel[];
  reorderRfis: (rfiList: RFIModel[], rfiId: string, newIndex: number) => void;
  sortKey: SortKey;
  className?: string;
}

function pendingRFIs(rfis: RFIModel[], scrollRegionRef: any) {
  return rfis.map((rfi: RFIModel, index: number) =>
    <PendingRFIRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}/>
  );
}

function openRFIs(rfis: RFIModel[], scrollRegionRef: any, sortKey: SortKey) {

  if (sortKey.field === Field.PRIORITY && sortKey.defaultOrder) {
    return rfis.map((rfi: RFIModel, index: number) =>
      <Draggable draggableId={rfi.id} index={index} key={rfi.id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={rfi.id}
              ref={provided.innerRef}
            >
              <OpenRFIRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}/>
            </div>
          )
        }}
      </Draggable>
    )
  } else {
    return rfis.map((rfi: RFIModel, index: number) =>
      <OpenRFIRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}/>
    );
  }
}


function closedRFIs(rfis: RFIModel[], scrollRegionRef: any) {
  return rfis.map((rfi: RFIModel, index: number) =>
    <ClosedRFIRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}/>
  );
}

export const RFITable: React.FC<Props> = props => {
  let scrollRegionRef = React.createRef();

  function reorder(dropResult: DropResult) {
    console.log(dropResult.destination);
    console.log(props.sortKey);
    if (props.sortKey.field === Field.PRIORITY && props.sortKey.defaultOrder)
      props.reorderRfis(props.openRfis, dropResult.draggableId, dropResult.destination!.index);
  }

  return (
    <div className={classNames('rfi-table', props.className)}>
      <DragDropContext onDragEnd={reorder}>
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
            <Droppable droppableId={`region--droppable--pending`}>
              {(provided, snapshot) => {
                return (
                  <StyledRegion
                    title={'pending'}
                    emptyMessage={'Congratulations! Your team opened all the new RFIs in GETS.'}
                    provided={provided}
                  >
                    {pendingRFIs(props.pendingRfis, scrollRegionRef)}
                  </StyledRegion>
                )
              }}
            </Droppable>
            <Droppable droppableId={`region--droppable--open`}>
              {(provided, snapshot) => {
                return (
                  <StyledRegion
                    title={'open'}
                    emptyMessage={'No Open found'}
                    provided={provided}
                  >
                    {openRFIs(props.openRfis, scrollRegionRef, props.sortKey)}
                  </StyledRegion>
                )
              }}
            </Droppable>
            <Droppable droppableId={`region--droppable--closed`}>
              {(provided, snapshot) => {
                return (
                  <StyledRegion
                    title={'closed'}
                    emptyMessage={''}
                    provided={provided}
                  >
                    {closedRFIs(props.closedRfis, scrollRegionRef)}
                  </StyledRegion>
                )
              }}
            </Droppable>
          </ScrollShadow>
        </div>
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  pendingRfis: state.pendingRfis,
  openRfis: state.openRfis,
  closedRfis: state.closedRfis,
  sortKey: state.sortKey
});

const mapDispatchToProps = {
  reorderRfis: reorderRfis
};

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
