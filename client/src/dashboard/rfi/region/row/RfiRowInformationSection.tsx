import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { connect } from 'react-redux';
import RfiModel, { RfiStatus } from '../../../../store/rfi/RfiModel';
import IconDnDBurger from '../../../../resources/icons/DnDBurgerVector';
import { formatRfiNum } from '../../../../utils';
import { ApplicationState } from '../../../../store';
import { Field } from '../../../../store/sort/SortKeyModel';
import theme from '../../../../resources/theme';
import { StyledIconShowMore } from '../../../../resources/icons/ShowMoreVector';
import { StyledIconShowLess } from '../../../../resources/icons/ShowLessVector';

interface Props {
  rfi: RfiModel;
  scrollRegionRef: any;
  prioritizing: boolean;
  className?: string;
}

export const RfiRowInformationSection: React.FC<Props> = props => {
  const [expanded, setExpanded] = React.useState(false);
  let descriptionRef = React.createRef<HTMLSpanElement>();

  function scrollFit(descriptionContainer: HTMLSpanElement) {
    let scrollRegion;
    let distanceToPageTop;
    let expandedRowHeight;
    let clientHeight;
    let offsetTop;
    let buffer;
    let headerHeight;
    try {
      scrollRegion = props.scrollRegionRef.current!;
      distanceToPageTop = descriptionContainer.getBoundingClientRect().top;
      expandedRowHeight = descriptionContainer.scrollHeight + 32;
      clientHeight = scrollRegion.clientHeight;
      offsetTop = descriptionContainer.offsetTop;
      buffer = 12;
      headerHeight = 98;
    } catch {
      console.log('error initializing scroll parameters');
      return;
    }

    if (distanceToPageTop + expandedRowHeight > clientHeight + headerHeight) { //Bottom of row extends beyond client
      if (expandedRowHeight > clientHeight) { //row is longer than window, so scroll to top of row
        scrollRegion.scrollTo({
          top: offsetTop - buffer,
          behavior: 'smooth',
        });
      } else { //push up just enough to leave row at bottom
        scrollRegion.scrollTo({
          top: offsetTop - (clientHeight - expandedRowHeight) + buffer,
          behavior: 'smooth',
        });
      }
    }
  }

  function handleSeeMoreLessClick() {
    let descriptionContainer = descriptionRef.current!;
    setExpanded(!expanded);
    if (!expanded)
      setTimeout(scrollFit, 50, descriptionContainer); //slight delay to ensure we use the expanded row height
  }

  return (
    <div
      className={classNames('row-section', 'section--information', props.className)}
    >
      {props.rfi.priority > -1 && props.rfi.status === 'OPEN' ? props.prioritizing ?
        <div className={classNames('cell', 'cell--pri')}>
          <IconDnDBurger/>
          <span className={'priority'}>{props.rfi.priority}</span>
        </div>
        :
        <div className={classNames('cell', 'cell--pri', 'not-prioritizing')}>
          <IconDnDBurger/>
          <span className={'priority'}>{props.rfi.priority}</span>
        </div>
        :
        <div className={classNames('cell', 'cell--pri', 'not-prioritizing')}>
          <IconDnDBurger/>
          <span className={'priority'}>-</span>
        </div>
      }
      <span className={classNames('cell', 'cell--rfiNum')}>
        {formatRfiNum(props.rfi.rfiNum)}
      </span>
      <span className={classNames('cell', 'cell--country')}>
          {props.rfi.country}
        </span>
      <span className={classNames('cell', 'cell--customer')}>
          <div>{props.rfi.customer}</div>
      </span>
      <span className={classNames('cell', 'cell--ltiov')}>
            {props.rfi.ltiov === undefined ? '-' : props.rfi.ltiov.utc().format('D MMM YY').toUpperCase()}
      </span>
      <span className={classNames('cell', 'cell--tgtCount')}>
          {props.rfi.status === RfiStatus.PENDING ? '-' : props.rfi.tgtCount}
      </span>
      <span className={classNames('cell', 'cell--ixnCount')}>
          {props.rfi.status === RfiStatus.PENDING ? '-' : props.rfi.ixnCount}
      </span>
      <div className={'description-container'}>
        <span className={classNames('cell', expanded ? 'cell--description-expanded' : 'cell--description')}
              ref={descriptionRef}>
            {props.rfi.description}
        </span>
      </div>
      <div className={classNames('see-more-or-less',
        props.rfi.description.length > 100 ? '' : 'hidden')} onClick={() => {
        handleSeeMoreLessClick();
      }}>
        {expanded ? <StyledIconShowLess/> : <StyledIconShowMore/>}
      </div>
    </div>
  );
};

const mapStateToProps = ({rfiState}: ApplicationState) => ({
  prioritizing: rfiState.sortKey.field === Field.PRIORITY && rfiState.sortKey.defaultOrder,
});

const mapDispatchToProps = {
};

export const StyledRfiRowInformationSection = styled(
  connect(mapStateToProps, mapDispatchToProps)(RfiRowInformationSection))`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  min-width: 1098px;
  max-width: 1336px;
  justify-content: space-around;
  border-top-left-radius: 8px;
  font-size: ${theme.font.sizeRow};
  text-align: left;
  align-items: start;
  flex-wrap: wrap;
  
  .cell {
    padding-left: 16px;
    line-height: 56px;
  }
  
  .cell--pri {
    display: flex;
    flex-direction: row;
    flex: 0 0 88px;
    align-items: center;
    justify-content: space-around;
  }
  
  .not-prioritizing {
    svg {
      path {
        fill: ${theme.color.backgroundInformation};
      }
    }
  }
  
  .priority {
    width: 14px;
  }
  
  .cell--id {
    flex: 0 0 88px;
    justify-content: center;
    text-align: right;
  }
  
  .cell--customer {
    white-space: nowrap;
    flex: 0 1 152px;
  }  
  
  .cell--customer div {
    width: 152px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .cell--ltiov {
    flex: 0 1 96px;
  }
    
  .cell--country {
    flex: 0 1 56px;
  }
  
  .cell--tgtCount {
    flex: 0 0 59px;
    text-align: center;
  }
  
   .cell--ixnCount {
    flex: 0 0 59px;
    text-align: center;
  }
  
  .cell--navigate-to-tgt-button {
    flex: 0 0 74px;
  }
  
  .hidden {
    opacity:0;
    z-index: -100;
  }
  
  .cell--navigate-to-tgt-button {
    border: none;
    cursor: pointer;
    background: none;
    padding-top: 9px;
    padding-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .cell--gets-button {
    width: 164px;
    font-weight: ${(props) => props.theme.font.weightBold};
    padding: 16px;
    border-top-right-radius: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
      
    :hover {
      text-shadow: 0 0 4px #FFFFFF;
      svg {
        filter: drop-shadow(0 0 4px #FFFFFF);
      }
    }
  }
  
  .cell--navigate-to-tgt-button-disabled {
    border: none;
    background: none;
    width: 59px;  
    height: 49px;
    padding-left: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  
  .description-container {
     display: flex;
     flex: 1;
     flex-direction: row;
     overflow: hidden;
     max-width: 928px;
     min-width: 304px;
     justify-content: space-between;
     align-items: flex-start;

  }  
  
  .cell--description {
     padding-top: 7px;
     display: flex;
     flex: 1 1 0;
     max-height: 3em;
     overflow: hidden;
     max-width: 928px;
     min-width: 224px;
     justify-content: space-between;
     line-height: 1.2em;
  }
  
  .cell--description-expanded {
     padding-top: 7px;
     display: flex;
     flex: 1 1;
     max-width: 928px;
     min-width: 224px;
     justify-content: space-between;
     line-height: 1.2em;
  }
  
  .see-more-or-less {
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex: 0 0 62px;
    height: 100%;
    align-self: start;
    padding-right: 7px;
    padding-left: 5px;
    padding-bottom: 6px;
    cursor: pointer;
  }
`;
