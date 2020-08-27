import * as React from 'react';
import { ScoiModel } from '../../store/scoi/ScoiModel';
import { StyledTableHeader } from '../components/header/TableHeader';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledScoiRow } from './ScoiRow';
import theme from '../../resources/theme';

interface MyProps {
  scois: ScoiModel[];
  selectedScoiId: number;
  handleSelectScoi: (scoiId: number) => void;
  showRfiInfo: boolean;
  toggleRfiInfo: () => void;
  className?: string;
}

const ScoiTable: React.FC<MyProps> = (props) => {
  const mapScoiRows = () => {
    return props.scois.map(
      (scoi, index) =>
        <StyledScoiRow
          key={`scoi-row-${index}`}
          scoi={scoi}
          selected={props.selectedScoiId === scoi.id}
          select={() => props.handleSelectScoi(scoi.id!)}
          showRfiInfo={props.showRfiInfo}
          toggleRfiInfo={props.toggleRfiInfo}
        />,
    );
  };

  return (
    <div className={classNames('scoi-table', props.className)}>
      <StyledTableHeader
        headers={['SCOI', 'MGRS', 'Associations']}
      />
      <div className={'scoi-table-body'}>
        {mapScoiRows()}
      </div>
    </div>
  );
};

export const StyledScoiTable = styled(ScoiTable)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  .header-cell--scoi {
    width: 106px;
    margin-right: 8px;
    margin-left: 0 !important;
  }
  
  .header-cell--mgrs {
    width: 154px;
    margin-right: 8px;
    margin-left: 0 !important;
  }
  
  .header-cell--associations {
    margin-left: 0 !important;
  }
  
  .table-header {
    width: 548px;
    justify-content: flex-start !important;
    margin: 0 !important;
    padding-left: 22px;
    height: 28px;
    flex-shrink: 0;
  }
  
  .scoi-table-body {
    padding: 6px; 
    width: 590px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: auto;
  }
  
  .highlighted {
    background: ${theme.color.backgroundFocus};
    cursor: default;
  }
`;
