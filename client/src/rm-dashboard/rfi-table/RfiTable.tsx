import * as React from 'react';
import styled from 'styled-components';
import RfiModel from '../RfiModel';
import classNames from 'classnames';
import { StyledRfiTableHeader } from './RfiTableHeader';
import ScrollShadow from './scroll-shadow';
import theme from '../../styles/theme';
import { StyledRegion } from './Region';
import { ClosedRfiRow, OpenRfiRow, PendingRfiRow } from './RfiRow';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorderRfis } from '../RfiActions';
import { Field, SortKeyModel } from '../SortKeyModel';

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
      <Draggable draggableId={rfi.id} index={index} key={rfi.id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={rfi.id}
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

export const RfiTable: React.FC<Props> = props => {
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
                  <StyledRegion
                    title={'open'}
                    emptyMessage={'No Open found'}
                    provided={provided}
                  >
                    {openRfis(props.openRfis, scrollRegionRef, props.sortKey)}
                  </StyledRegion>
                )
              }}
            </Droppable>
            <Droppable droppableId={`region--droppable--pending`}>
            {(provided, snapshot) => {
              return (
                <StyledRegion
                  title={'pending'}
                  emptyMessage={'Congratulations! Your team opened all the new RFIs in GETS.'}
                  provided={provided}
                >
                  {pendingRfis(props.pendingRfis, scrollRegionRef)}
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
                    {closedRfis(props.closedRfis, scrollRegionRef)}
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

export const StyledRfiTable = styled(
  connect(mapStateToProps, mapDispatchToProps)(RfiTable))`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  
  .rfi-table--body{
    overflow-y: auto; 
    display: flex;
    margin-bottom: 48px;
  }
`;
