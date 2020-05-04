import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import RfiModel from '../../../store/rfi/RfiModel';
import theme from '../../../resources/theme';
import { formatRfiNum } from '../../../utils';

interface Props {
  rfi: RfiModel;
  selectRfi: (rfi: RfiModel) => void;
  selected: boolean;
  collapsed: boolean;
  index?: number;
  className?: string;
}

export const MiniRfiRow: React.FC<Props> = props => {

  return (
    <div className={props.className} id={'rfi-row-' + props.rfi.id}>
      <div
        className={classNames('rfi-row', props.selected ? 'selected' : null)}
        key={props.rfi.rfiNum}
        onClick={() => props.selectRfi(props.rfi)}
      >
        <span className={classNames('cell', 'cell--rfi-num')}>
          {formatRfiNum(props.rfi.rfiNum)}
        </span>
        {!props.collapsed ?
          <span className={classNames('cell', 'cell--customer')}>
            {props.rfi.customer}
          </span>
          :
          null
        }
      </div>
    </div>
  );
};

export const StyledMiniRfiRow = styled(MiniRfiRow)`
  .rfi-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: ${(props) => props.collapsed ? '65px' : '192px'};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightBold};
    color: ${theme.color.fontActive};
    border-radius: 8px;
    margin-bottom: 8px;
    height: 62px;
    white-space: nowrap;
    cursor: pointer;
    background-color: ${theme.color.backgroundInformation};
    padding: ${(props) => props.collapsed ? '0 6px' : '0'}
    
    :hover {
      box-shadow: 0 0 4px #FFF;
    }
  }
  
  .selected {
    background-color: ${theme.color.backgroundFocus};
  }
  
  .cell--rfi-num {
    width: 60px;
  }
 
  
  .cell--customer {
    width: 90px;
  }
  
  .cell--customer div {
    width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
