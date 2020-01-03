import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledHeaderCell } from './RfiTableHeaderCell';
import { connect } from 'react-redux';
import { fetchRfis, sortByCountry, sortByCustomer, sortById, sortByLtiov, sortByPriority } from '../RfiActions';
import { StyledUnsortableHeaderCell } from './UnsortableHeaderCell';
import { StyledButtonSection } from './RfiTableHeaderButtonSection';
import { postRefreshClick } from '../../users/UserActions';

interface Props {
  sortByPriority: () => void;
  sortById: () => void;
  sortByCountry: () => void;
  sortByCustomer: () => void;
  sortByLtiov: () => void;
  refreshClick: () => void;
  fetchRfis: () => void;
  className?: string;
}

export const RfiTableHeader: React.FC<Props> = props => {
  return (
    <div className={classNames('header', props.className)}>
      <div className={'header-cell--textLabels'}>
        <StyledHeaderCell
          text={'PRI'}
          sort={props.sortByPriority}
          className={'header-cell--pri'}
        />
        <StyledHeaderCell
          text={'RFI'}
          sort={props.sortById}
          className={'header-cell--id'}
        />
        <StyledHeaderCell
          text={'CC'}
          sort={props.sortByCountry}
          className={'header-cell--country'}
        />
        <StyledHeaderCell
          text={'Customer'}
          sort={props.sortByCustomer}
          className={'header-cell--customer'}
        />
        <StyledHeaderCell
          text={'LTIOV'}
          sort={props.sortByLtiov}
          className={'header-cell--ltiov'}
        />
        <StyledUnsortableHeaderCell
          text={'Description'}
          className={'header-cell--description'}
        />
      </div>
      <StyledButtonSection
        refreshClick={props.refreshClick}
        fetchRfis={props.fetchRfis}
        className={'header-cell--buttonSection'}
      />
    </div>
  );
};


const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  sortByPriority: sortByPriority,
  sortById: sortById,
  sortByCountry: sortByCountry,
  sortByCustomer: sortByCustomer,
  sortByLtiov: sortByLtiov,
  refreshClick: postRefreshClick,
  fetchRfis: fetchRfis
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
    width: 88px;
    margin-left: 9px;
  }
  
  .header-cell--buttonSection {
    justify-content: flex-end;
  }

`;
