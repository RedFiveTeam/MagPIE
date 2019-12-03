import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledHeaderCell } from './HeaderCell';
import { connect } from 'react-redux';
import { sortByCountry, sortByCustomer, sortById, sortByLtiov } from '../RFIActions';

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
    </div>
  );
};


const mapStateToProps = (state: any) => ({
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
    margin: 0 16px;
  }
  
  .header-cell--id {
    justify-content: flex-end;
    width: 72px;
  }
  
  .header-cell--country {
    width: 40px;
  }
  
  .header-cell--customer{
    width: 136px;
  }
  
  .header-cell--ltiov {
    width: 80px;
  }
  
  .spacer--button {
    width: 168px;
  }
  .spacer--requestText {
    width: 928px;
  }
`;
