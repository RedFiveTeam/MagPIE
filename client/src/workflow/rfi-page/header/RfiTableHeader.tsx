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
          className={'header-cell--pri'}
        />
        <StyledHeaderCell
          text={'RFI'}
          sort={() => props.sortRfis(Field.ID)}
          className={'header-cell--id'}
        />
        <StyledHeaderCell
          text={'CC'}
          sort={() => props.sortRfis(Field.COUNTRY)}
          className={'header-cell--country'}
        />
        <StyledHeaderCell
          text={'Customer'}
          sort={() => props.sortRfis(Field.CUSTOMER)}
          className={'header-cell--customer'}
        />
        <StyledHeaderCell
          text={'LTIOV'}
          sort={() => props.sortRfis(Field.LTIOV)}
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
        sortKey={props.sortKey}
        className={'header-cell--buttonSection'}
      />
    </div>
  );
};


const mapStateToProps = (state: any) => ({
  sortKey: state.sortKey
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
    padding-left: 33px;
    width: 85px;
  }
  
  .header-cell--textLabels {
    display: flex;
    flex-direction: row;
  }
  
  .header-cell--id {
    justify-content: flex-end;
    width: 91px;
  }
  
  .header-cell--country {
    width: 56px;
  }
  
  .header-cell--customer{
    width: 158px;
  }
  
  .header-cell--ltiov {
    width: 80px;
    margin-left: 9px;
  }
  
  .header-cell--coi {
    width: 50px;  
  }
  
  .header-cell--buttonSection {
    justify-content: flex-end;
  }

`;
