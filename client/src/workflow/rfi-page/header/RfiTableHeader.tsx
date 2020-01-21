import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledHeaderCell } from './RfiTableHeaderCell';
import { connect } from 'react-redux';
import { StyledUnsortableHeaderCell } from './RfiTableUnsortableHeaderCell';
import { StyledButtonSection } from './RfiTableHeaderButtonSection';
import { postRefreshClick } from '../../../state/actions';
import { Field, SortKeyModel } from '../models/SortKeyModel';
import { fetchLocalUpdate, sortRfis } from '../../../state/actions';

interface Props {
  sortRfis: (field: Field) => void;
  postRefreshClick: () => void;
  fetchLocalUpdate: () => void;
  sortKey: SortKeyModel;
  className?: string;
}

export const RfiTableHeader: React.FC<Props> = props => {
  return (
    <div className={classNames('header', props.className)}>
      <div className={'header-cell--textLabels'}>
        <StyledHeaderCell
          text={'PRI'}
          sort={() => props.sortRfis(Field.PRIORITY)}
          field={Field.PRIORITY}
          className={'header-cell--pri'}
        />
        <StyledHeaderCell
          text={'RFI'}
          sort={() => props.sortRfis(Field.RFINUM)}
          field={Field.RFINUM}
          className={'header-cell--rfi-num'}
        />
        <StyledHeaderCell
          text={'CC'}
          sort={() => props.sortRfis(Field.COUNTRY)}
          field={Field.COUNTRY}
          className={'header-cell--country'}
        />
        <StyledHeaderCell
          text={'Customer'}
          sort={() => props.sortRfis(Field.CUSTOMER)}
          field={Field.CUSTOMER}
          className={'header-cell--customer'}
        />
        <StyledHeaderCell
          text={'LTIOV'}
          sort={() => props.sortRfis(Field.LTIOV)}
          field={Field.LTIOV}
          className={'header-cell--ltiov'}
        />
        <StyledUnsortableHeaderCell
          text={'COIs'}
          className={'header-cell--coi'}
        />
        <StyledUnsortableHeaderCell
          text={'Description'}
          className={'header-cell--description'}
        />
      </div>
      <StyledButtonSection
        postRefreshClick={props.postRefreshClick}
        fetchLocalUpdate={props.fetchLocalUpdate}
        className={'header-cell--buttonSection'}
      />
    </div>
  );
};


const mapStateToProps = (state: any) => ({
  sortKey: state.rfiReducer.sortKey
});

const mapDispatchToProps = {
  sortRfis: sortRfis,
  postRefreshClick: postRefreshClick,
  fetchLocalUpdate: fetchLocalUpdate
};

export const StyledRfiTableHeader = styled(
  connect(mapStateToProps, mapDispatchToProps)(RfiTableHeader))`
  font-family: ${(props) => props.theme.font.familyHeader};
  color: ${(props) => props.theme.color.fontPrimary};
  font-weight: ${(props) => props.theme.font.weightHeader};
  font-size: ${(props) => props.theme.font.sizeHeader};
  margin-top: 64px;
  margin-right: 20px;
  height: 48px;
  display: flex;
  width: available;
  flex: 1 1;
  flex-direction: row;
  justify-content: space-between;
  
  .header-cell {
    padding-left: 16px;
  }
  
  .header-cell--pri {
    width: 102px;
  }
  
  .header-cell--textLabels {
    display: flex;
    flex-direction: row;
  }
  
  .header-cell--rfi-num {
    justify-content: flex-start;
    width: 70px;
  }
  
  .header-cell--country {
    width: 56px;
  }
  
  .header-cell--customer{
    width: 168px;
  }
  
  .header-cell--ltiov {
    width: 80px;
  }
  
  .header-cell--coi {
    width: 50px;  
  }
  
  .header-cell--buttonSection {
    justify-content: flex-end;
  }

`;
