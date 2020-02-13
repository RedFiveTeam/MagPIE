import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { connect } from 'react-redux';
import UpperSortButtonVector from '../../../resources/icons/UpperSortButton';
import ActiveLowerSortButtonVector from '../../../resources/icons/ActiveLowerSortButton';
import LowerSortButtonVector from '../../../resources/icons/LowerSortButton';
import ActiveUpperSortButtonVector from '../../../resources/icons/ActiveUpperSortButton';
import { ApplicationState } from '../../../store';
import { Field, SortKeyModel } from '../../../store/sort/SortKeyModel';

interface Props {
  text: string;
  sort: () => void;
  sortKey: SortKeyModel;
  field: Field;
  className?: string;
}

export const RfiTableHeaderCell: React.FC<Props> = props => {

  return (
    <div
      className={classNames('header-cell', props.className)}
      onClick={props.sort}
    >
      <span className={'header--' + props.text.toLowerCase()}>
        {props.text}
      </span>
      <div className={classNames('icon--sort', props.className)}>
      <span className={classNames('upper--sort')}>
        {props.sortKey.defaultOrder &&
        (props.sortKey.field === props.field)  ?
          <ActiveUpperSortButtonVector/> : <UpperSortButtonVector/>}
      </span>
      <span className={classNames('lower--sort')}>
        {!props.sortKey.defaultOrder &&
        (props.sortKey.field === props.field) ?
          <ActiveLowerSortButtonVector/> : <LowerSortButtonVector/>}
      </span>
      </div>
    </div>
  )
};

const mapStateToProps = ({rfis}: ApplicationState) => ({
  sortKey: rfis.sortKey
});

export const StyledHeaderCell = styled(connect(mapStateToProps)(RfiTableHeaderCell))`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  
  .icon--sort {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: -10px;
    margin-left: 4px;
  }
  
  .upper--sort {
    height: 10px;
    width:10px;
  }
  
  .lower--sort {
    height: 10px;
    width: 10px;
  }

`;
