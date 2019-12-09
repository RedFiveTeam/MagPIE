import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledHeaderCell } from './HeaderCell';
import { connect } from 'react-redux';
import { sortByCountry, sortByCustomer, sortById, sortByLtiov } from '../RFIActions';
import { StyledUnsortableHeaderCell } from './UnsortableHeaderCell';

interface Props {
  sortById: () => void;
  sortByCountry: () => void;
  sortByCustomer: () => void;
  sortByLtiov: () => void;
  className?: string;
}

export const RFITableHeader: React.FC<Props> = props => {
  return (
    <div className={classNames('header', props.className)}>
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
      <div className={'spacer--requestText'}/>
      <div className={'spacer--button'}/>
      <StyledUnsortableHeaderCell
        text={'Description'}
        className={'header-cell--description'}
      />

      <div className={'spacer--gets-button'}/>
    </div>
  );
};


const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  sortById: sortById,
  sortByCountry: sortByCountry,
  sortByCustomer: sortByCustomer,
  sortByLtiov: sortByLtiov
};

export const StyledRFITableHeader = styled(
  connect(mapStateToProps, mapDispatchToProps)(RFITableHeader))`
  font-family: ${(props) => props.theme.font.familyHeader};
  color: ${(props) => props.theme.color.fontPrimary};
  font-weight: ${(props) => props.theme.font.weightHeader};
  font-size: ${(props) => props.theme.font.sizeHeader};
  margin-top: 64px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left; 
  flex-basis: auto;
  width: max-content;
  
  .header-cell {
    padding-left: 16px;
    margin: 0 16px;
  }
  
  .header-cell--id {
    justify-content: flex-end;
    width: 88px;
  }
  
  .header-cell--country {
    width: 56px;
  }
  
  .header-cell--customer{
    width: 152px;
  }
  
  .header-cell--ltiov {
    width: 96px;
    margin-left: 9px;
  }
  
  .spacer--gets-button {
    width: 184px;
  }
  .spacer--requestText {
    width: 928px;
  }

`;
