import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledHeaderCell } from './RfiTableHeaderCell';
import { connect } from 'react-redux';
import { StyledUnsortableTableHeaderCell } from './UnsortableTableHeaderCell';
import { StyledButtonSection } from './RfiTableHeaderButtonSection';

import { ApplicationState } from '../../../store';
import { Field, SortKeyModel } from '../../../store/sort/SortKeyModel';
import { sortRfis } from '../../../store/rfi';
import { fetchLocalUpdate } from '../../../store/rfi/Thunks';
import { postRefreshClick } from '../../../store/metrics';
import theme from '../../../resources/theme';

interface Props {
  sortRfis: (field: Field) => void;
  postRefreshClick: () => void;
  fetchLocalUpdate: () => void;
  sortKey: SortKeyModel;
  className?: string;
}

export const RfiTableHeader: React.FC<Props> = props => {
  // TODO: refactor headers into a map using the similar style to target table headers for cleanliness and DRY
  //
  // let sortableHeaders: string[] = ['PRI', 'RFI', 'CC', 'Customer', 'LTIOV'];
  // let unsortableHeaders: string[] = ['TGTs', 'Description'];

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
        <StyledUnsortableTableHeaderCell
          text={'TGTs'}
          className={'header-cell--tgt'}
        />
        <StyledUnsortableTableHeaderCell
          text={'IXNs'}
          className={'header-cell--tgt'}
        />
        <StyledUnsortableTableHeaderCell
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

const mapStateToProps = ({rfiState}: ApplicationState) => ({
  sortKey: rfiState.sortKey
});

const mapDispatchToProps = {
  sortRfis: sortRfis,
  postRefreshClick: postRefreshClick,
  fetchLocalUpdate: fetchLocalUpdate
};

export const StyledRfiTableHeader = styled(
  connect(mapStateToProps, mapDispatchToProps)(RfiTableHeader))`
  font-family: ${theme.font.familyHeader};
  color: ${theme.color.fontPrimary};
  font-weight: ${theme.font.weightHeader};
  font-size: ${theme.font.sizeRow};
  margin-top: 64px;
  margin-right: 20px;
  height: 48px;
  display: flex;
  flex: 0 0;
  flex-direction: row;
  justify-content: space-between;
  
  .header--pri {
    padding-left: 26px; 
  }
  
  .header--tgts {
    text-align: center;
  }
  
  .header--ixns {
    text-align: center;
  }
  
  
  .header-cell {
    padding-left: 16px;
  }
  
  .header-cell--pri {
    width: 88px;
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
    padding-left: 0;
    width: 56px;
  }
  
  .header--cc {
    padding-left: 10px;
  }
  
  .header-cell--customer{
    width: 168px;
  }
  
  .header-cell--ltiov {
    width: 96px;
  }
  
  .header-cell--tgt {
    width: 59px;  
    padding-left: 8px;
  }
  
  .header-cell--description {
    padding-left: 0;
    margin-left: 0;
  }
  
  .header-cell--buttonSection {
    justify-content: flex-end;
  }

`;
