import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledHeaderCell } from './RfiTableHeaderCell';
import { Field, SortKeyModel } from '../../../store/sort/SortKeyModel';
import theme from '../../../resources/theme';

interface Props {
  sortRfis: (field: Field) => void;
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
      <StyledHeaderCell
        text={'PRI'}
        sort={() => props.sortRfis(Field.PRIORITY)}
        field={Field.PRIORITY}
        className={'header-cell--pri'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'RFI'}
        sort={() => props.sortRfis(Field.RFINUM)}
        field={Field.RFINUM}
        className={'header-cell--rfi-num'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'CC'}
        sort={() => props.sortRfis(Field.COUNTRY)}
        field={Field.COUNTRY}
        className={'header-cell--country'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'Customer'}
        sort={() => props.sortRfis(Field.CUSTOMER)}
        field={Field.CUSTOMER}
        className={'header-cell--customer'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'LTIOV'}
        sort={() => props.sortRfis(Field.LTIOV)}
        field={Field.LTIOV}
        className={'header-cell--ltiov'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'TGTs'}
        sort={() => props.sortRfis(Field.TGTS)}
        field={Field.TGTS}
        className={'header-cell--count'}
        sortKey={props.sortKey}
      />
      <StyledHeaderCell
        text={'IXNs'}
        sort={() => props.sortRfis(Field.IXNS)}
        field={Field.IXNS}
        className={'header-cell--count'}
        sortKey={props.sortKey}
      />
    </div>
  );
};

export const StyledRfiTableHeader = styled(RfiTableHeader)`
  font-family: ${theme.font.familyHeader};
  color: ${theme.color.fontPrimary};
  font-weight: ${theme.font.weightHeader};
  font-size: ${theme.font.sizeRow};
  margin-top: 17px;
  margin-right: 20px;
  height: 48px;
  display: flex;
  flex: 0 0;
  flex-direction: row;
  justify-content: space-between;
  width: 509px;
  
  .header--tgts {
    text-align: center;
    height: 20px;
  }
  
  .header--ixns {
    text-align: center;
    height: 20px;
  }
  
  .header-cell--pri {
    padding-left: 40px;
    width: 61px;
  }
  
  .header-cell--rfi-num {
    justify-content: flex-start;
    width: 60px;
  }
  
  .header-cell--country {
    width: 45px;
  }
  
  .header-cell--customer{
    width: 95px;
  }
  
  .header-cell--ltiov {
    width: 75px;
  }
  
  .header-cell--count {
    width: 30px;  
  }
  
  .header-cell--description {
    padding-left: 0;
    margin-left: 0;
  }
`;
