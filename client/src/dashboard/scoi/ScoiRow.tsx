import * as React from 'react';
import { ScoiModel } from '../../store/scoi/ScoiModel';
import styled from 'styled-components';
import theme from '../../resources/theme';
import classNames from 'classnames';
import RfiInfoButton from '../../resources/icons/RfiInfoButton';

interface MyProps {
  scoi: ScoiModel;
  selected: boolean;
  select: () => void;
  showRfiInfo: boolean;
  toggleRfiInfo: () => void;
  className?: string;
}

const ScoiRow: React.FC<MyProps> = (props) => {
  return (
    <div className={classNames('scoi-row', props.className, props.selected ? 'highlighted' : null)}
         onClick={props.select}
         id={'scoi-row-' + props.scoi.id}
    >
      <div className={'scoi-row-cell scoi-name'}>
        {props.scoi.name}
      </div>
      <div className={'scoi-row-cell scoi-mgrs'}>
        {props.scoi.mgrs}
      </div>
      <div className={'scoi-row-cell scoi-associations'}>
        <div className={'rfi-associations-button'}
             onClick={() => {if (props.selected) props.toggleRfiInfo();}}
        >
          <RfiInfoButton active={props.selected && props.showRfiInfo}/>
        </div>
      </div>
    </div>
  );
};

export const StyledScoiRow = styled(ScoiRow)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: ${theme.color.backgroundInformation};
  width: 548px;
  height: 58px;
  border-radius: 8px;
  margin-bottom: 8px;
  flex-shrink: 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${theme.color.fontPrimary};
  padding-left: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px #000000;
  
  :hover {
    box-shadow: 0 0 6px #FFFFFF;
  }
  
  .scoi-row-cell {
    margin-right: 8px;
  }
  
  .scoi-name {
    width: 106px;
  }
  
  .scoi-mgrs {
    width: 154px;
  }
  
  .rfi-associations-button {
    cursor: pointer;
  }
`;
