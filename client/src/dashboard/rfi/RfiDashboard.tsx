import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import theme from '../../resources/theme';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { ApplicationState } from '../../store';
import RfiModel from '../../store/rfi/RfiModel';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import { ClosedRfiRow, OpenRfiRow, PendingRfiRow } from './region/row/RfiRow';
import { StyledRfiTableHeader } from './rfiDashboardTableHeader/RfiTableHeader';
import { StyledRfiRegion } from './region/RfiRegion';
import { reorderRfis } from '../../store/rfi/Thunks';
import ScrollShadow from '../components/scroll-shadow';

interface Props {
  pendingRfis: RfiModel[];
  openRfis: RfiModel[];
  closedRfis: RfiModel[];
  reorderRfis: (rfiList: RfiModel[], rfiId: string, newIndex: number) => void;
  sortKey: SortKeyModel;
  className?: string;
}

function pendingRfis(rfis: RfiModel[], scrollRegionRef: any) {
  return rfis.map((rfi: RfiModel, index: number) =>
    <PendingRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}/>
  );
}

function openRfis(rfis: RfiModel[], scrollRegionRef: any, sortKey: SortKeyModel) {

  if (sortKey.field === Field.PRIORITY && sortKey.defaultOrder) {
    return rfis.map((rfi: RfiModel, index: number) =>
      <Draggable draggableId={rfi.rfiNum} index={index} key={rfi.rfiNum}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={rfi.rfiNum}
              ref={provided.innerRef}
            >
              <OpenRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}/>
            </div>
          )
        }}
      </Draggable>
    )
  } else {
    return rfis.map((rfi: RfiModel, index: number) =>
      <OpenRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}/>
    );
  }
}


function closedRfis(rfis: RfiModel[], scrollRegionRef: any) {
  return rfis.map((rfi: RfiModel, index: number) =>
    <ClosedRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}/>
  );
}

export const RfiDashboard: React.FC<Props> = props => {
  let scrollRegionRef = React.createRef();

  function reorder(dropResult: DropResult) {
    if (dropResult.destination && dropResult.destination.droppableId === "region--droppable--open"
     && props.sortKey.field === Field.PRIORITY && props.sortKey.defaultOrder)
      props.reorderRfis(props.openRfis, dropResult.draggableId, dropResult.destination!.index);
  }

  return (
    <div className={classNames('rfi-table', props.className)}>
      <DragDropContext onDragEnd={reorder}>
        <StyledRfiTableHeader/>
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

            <Droppable droppableId={`region--droppable--open`}>
              {(provided, snapshot) => {
                return (
                  <StyledRfiRegion
                    title={'open'}
                    emptyMessage={'No Open found'}
                    provided={provided}
                  >
                    {openRfis(props.openRfis, scrollRegionRef, props.sortKey)}
                  </StyledRfiRegion>
                )
              }}
            </Droppable>
            <Droppable droppableId={`region--droppable--pending`}>
            {(provided, snapshot) => {
              return (
                <StyledRfiRegion
                  title={'pending'}
                  emptyMessage={'Congratulations! Your team opened all the new RFIs in GETS.'}
                  provided={provided}
                >
                  {pendingRfis(props.pendingRfis, scrollRegionRef)}
                </StyledRfiRegion>
              )
            }}
          </Droppable>
            <Droppable droppableId={`region--droppable--closed`}>
              {(provided, snapshot) => {
                return (
                  <StyledRfiRegion
                    title={'closed'}
                    emptyMessage={''}
                    provided={provided}
                  >
                    {closedRfis(props.closedRfis, scrollRegionRef)}
                  </StyledRfiRegion>
                )
              }}
            </Droppable>
          </ScrollShadow>
        </div>
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = ({rfis}: ApplicationState) => ({
  pendingRfis: rfis.pendingRfis,
  openRfis: rfis.openRfis,
  closedRfis: rfis.closedRfis,
  sortKey: rfis.sortKey
});

const mapDispatchToProps = {
  reorderRfis: reorderRfis
};

export const StyledRfiDashboard = styled(
  connect(mapStateToProps, mapDispatchToProps)(RfiDashboard))`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  
  .rfi-table--body{
    overflow-y: auto; 
    display: flex;
    margin-bottom: 48px;
  }
`;
