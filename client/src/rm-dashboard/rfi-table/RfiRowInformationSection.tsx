import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import RfiModel from '../RfiModel';
import IconShowMore from '../../resources/ShowMoreVector';
import IconShowLess from '../../resources/ShowLessVector';
import IconDnDBurger from '../../styles/icons/DnDBurger';
import { connect } from 'react-redux';
import { Field } from '../SortKeyModel';

interface Props {
  rfi: RfiModel;
  scrollRegionRef: any;
  prioritizing: boolean;
  className?: string;
}

const formatID = (id: string): string => {
  let year: string = id.substr(id.length - 8, 2);
  let number: string = id.substr(id.length - 3, 3);
  return `${year}-${number}`;
};

export const RfiRowInformationSection: React.FC<Props> = props => {
  const [expanded, setExpanded] = React.useState(false);
  let descriptionRef = React.createRef<HTMLSpanElement>();

  function scrollFit(descriptionContainer: HTMLSpanElement) {
    let scrollRegion = props.scrollRegionRef.current!;
    const distanceToPageTop = descriptionContainer.getBoundingClientRect().top;
    const expandedRowHeight = descriptionContainer.scrollHeight + 32;
    const clientHeight = scrollRegion.clientHeight;
    const offsetTop = descriptionContainer.offsetTop;
    const buffer = 12;
    const headerHeight = 98;

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
    // scrollFit();
  }

  return (
    <div
      className={classNames('row-section', 'section--information', props.className)}
    >
      {props.rfi.priority > -1 ? props.prioritizing ?
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
            N/A
          </span>
      }
      <span className={classNames('cell', 'cell--id')}>
        {formatID(props.rfi.id)}
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
        <div>{expanded ? <IconShowLess/> : ''}</div>
        <div>{expanded ? 'See less' : 'See more'}</div>
        <div>{expanded ? <IconShowLess/> : <IconShowMore/>}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  prioritizing: state.sortKey.field === Field.PRIORITY && state.sortKey.defaultOrder,
});

export const StyledRfiRowInformationSection = styled(connect(mapStateToProps)(RfiRowInformationSection))`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  min-width: 887px;
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
     line-height: 1.3em;
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
    flex: 0 0 87px;
    height:52px;
    align-self: start;
    padding-right: 7px;
    padding-left: 5px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
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
    background: linear-gradient(180deg, rgba(32, 32, 32, 0) 0%, rgba(32, 32, 32, 0.5) 46.88%);
  }
  
  .see-less:hover {
    background: linear-gradient(180deg, rgba(70, 70, 70, 0.5) 0%, rgba(0, 0, 0, 0.5) 46.88%);
  }
  
  .see-less div {
    width: 65px;
  }
  
`;
