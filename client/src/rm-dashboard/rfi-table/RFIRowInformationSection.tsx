import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import RFIModel from '../RFIModel';
import IconShowMore from '../../resources/ShowMoreVector';
import IconShowLess from '../../resources/ShowLessVector';

interface Props {
  rfi: RFIModel;
  className?: string;
}

const formatID = (id: string): string => {
  let year: string = id.substr(id.length - 8, 2);
  let number: string = id.substr(id.length - 3, 3);
  return `${year}-${number}`;
};

export const RFIRowInformationSection: React.FC<Props> = props => {

  const [expanded, setExpanded] = React.useState(false);

// function checkScroll() {
//   let table = document.getElementById('this is the rfi table');
//   let row = document.getElementById(props.rfi.id);
//   let topPos = row!.offsetTop;
//   console.log(topPos);
//   table.set
// }


  function handleClick() {
    setExpanded(!expanded);
    if(!expanded)
      document.getElementById(props.rfi.id)!.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
  }

  return (
    <div
      className={classNames('row-section', 'section--information', props.className)}
    >
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
            {props.rfi.ltiov !== undefined ? props.rfi.ltiov.utc().format("D MMM YY").toUpperCase() : '-'}
          </span>

      <span className={classNames('cell', expanded ? 'cell--description-expanded' : 'cell--description')}  id={props.rfi.id}>
          {props.rfi.description}
      </span>
      <div className={classNames(expanded ? 'see-less' : 'see-more',
        props.rfi.description.length > 100 ? '' : 'hidden')} onClick={() => {handleClick()}}>
        <div>{expanded ? <IconShowLess/> : ''}</div>
        <div>{expanded ? 'See less' : 'See more'}</div>
        <div>{expanded ? <IconShowLess/> : <IconShowMore/>}</div>
      </div>

    </div>
  );
};

export const StyledRFIRowInformationSection = styled(RFIRowInformationSection)`
  display: flex;
  flex-direction: row;
  flex: 1 1;
  min-width: 855px;
  max-width: 1335px;
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
  
  .cell--description {
     padding-top: 7px;
     display: flex;
     flex: 1 1;
     max-height: 3em;
     overflow: hidden;
     max-width: 841px;
     min-width: 224px;
     justify-content: space-between;
     line-height: 1.3em;
  }
  
  .cell--description-expanded {
     padding-top: 7px;
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
