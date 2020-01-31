import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import RfiModel, { RfiStatus } from '../models/RfiModel';
import IconShowMore from '../../../resources/icons/ShowMoreVector';
import IconShowLess from '../../../resources/icons/ShowLessVector';
import IconDnDBurger from '../../../resources/icons/DnDBurgerVector';
import { connect } from 'react-redux';
import { Field } from '../models/SortKeyModel';
import TgtPageButtonVector from '../../../resources/icons/TgtPageButtonVector';
import { fetchRfiTargets, loadTgtPage } from '../../../state/actions';
import { formatRfiNum } from '../../../utils';
import { ApplicationState } from '../../../state';

interface Props {
  rfi: RfiModel;
  scrollRegionRef: any;
  prioritizing: boolean;
  loadTgtPage: (rfi: RfiModel, firstLoad: boolean) => void;
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
          behavior: 'smooth'
        });
      } else { //push up just enough to leave row at bottom
        scrollRegion.scrollTo({
          top: offsetTop - (clientHeight - expandedRowHeight) + buffer,
          behavior: 'smooth'
        });
      }
    }
  }

  function handleClick() {
    let descriptionContainer = descriptionRef.current!;
    setExpanded(!expanded);
    if (!expanded)
      setTimeout(scrollFit, 50, descriptionContainer); //slight delay to ensure we use the expanded row height
  }

  function addTgtToRFI() {
    props.loadTgtPage(props.rfi, true);
  }

  return (
    <div
      className={classNames('row-section', 'section--information', props.className)}
    >
      {props.rfi.priority > -1 && props.rfi.status === "OPEN" ? props.prioritizing ?
        <span className={classNames('cell', 'cell--pri-prioritizing')}>
                <IconDnDBurger/>
          {props.rfi.priority}
            </span>
        :
        <span className={classNames('cell', 'cell--pri')}>
              {props.rfi.priority}
            </span>
        :
        <span className={classNames('cell', 'cell--pri')}>
            -
          </span>
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
            {props.rfi.ltiov === undefined ? '-' : props.rfi.ltiov.utc().format("D MMM YY").toUpperCase()}
      </span>
      <div>
          {props.rfi.status === RfiStatus.OPEN ?
        <button onClick={addTgtToRFI} className={'cell--add-tgt-button'}>
          <TgtPageButtonVector/>
        </button>
            :
            <div className={'cell--add-tgt-button-disabled'}>
              <span>-</span>
            </div>
          }
      </div>
      <div className={'description-container'}>
        <span className={classNames('cell', expanded ? 'cell--description-expanded' : 'cell--description')}
              ref={descriptionRef}>
            {props.rfi.description}
        </span>
      </div>
      <div className={classNames(expanded ? 'see-less' : 'see-more',
        props.rfi.description.length > 100 ? '' : 'hidden')} onClick={() => {
        handleClick()
      }}>
        <div>
          <div>{expanded ? <IconShowLess/> : ''}</div>
          <div>{expanded ? 'See less' : ''}</div>
          <div>{expanded ? <IconShowLess/> : <IconShowMore/>}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({rfis}: ApplicationState) => ({
  prioritizing: rfis.sortKey.field === Field.PRIORITY && rfis.sortKey.defaultOrder,
});

const mapDispatchToProps = {
  loadTgtPage: loadTgtPage,
  fetchRfiTargets: fetchRfiTargets
};

export const StyledRfiRowInformationSection = styled(
  connect(mapStateToProps, mapDispatchToProps)(RfiRowInformationSection))`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  min-width: 950px;
  max-width: 1336px;
  justify-content: space-around;
  border-top-left-radius: 8px;
  font-size: ${(props) => props.theme.font.sizeRow};
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
    justify-content: flex-end;
    align-items: center;
  }
  
  .cell--pri-prioritizing {
    display: flex;
    flex-direction: row;
    flex: 0 0 88px;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
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
  
  .hidden {
    opacity:0;
    z-index: -100;
  }
  
  .cell--add-tgt-button {
    border: none;
    cursor: pointer;
    background: none;
    padding-top: 9px;
    padding-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    :hover {
      path {
        fill: ${(props) => props.theme.color.buttonActive};
      }
    }
  }
  
  .cell--add-tgt-button-disabled {
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
     padding-right: 7px;
     display: flex;
     flex: 1 1;
     max-width: 928px;
     min-width: 224px;
     justify-content: space-between;
     line-height: 1.3em;
  }
  
  .see-more {
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex: 0 0 62px;
    height:52px;
    align-self: start;
    padding-right: 7px;
    padding-left: 5px;
    cursor: pointer;
    
    :hover {
      path {
        fill: ${(props) => props.theme.color.buttonActive};
      }
    }
  }
   
  .see-less {
    cursor: pointer;
    display: flex;
    flex-basis: 100%;
    text-align: center;
    line-height: 32px;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 4px 4px 4px 4px;
    
    div {
      display: flex;
      flex-basis: 100%;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: nowrap;
      background: ${(props) => props.theme.color.showLessBackground}
      
      div {
        display: flex;
        flex-direction: row;
        flex: 0 0 66px;
        align-items: center;
        justify-content: center;
      }
      
    }
    
    :hover {
      color: ${(props) => props.theme.color.buttonActive};
      path {
        fill: ${(props) => props.theme.color.buttonActive};
      }
    }
  }
  
`;
