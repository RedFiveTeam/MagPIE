import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import theme from '../../../resources/theme';

interface Props {
  regionTitle: string
  className?: string;
}

export const RfiRegionDivider: React.FC<Props> = props => {
  return (
    <div className={classNames('region-divider', 'pending', props.className)}>
      <span className={classNames('separator-line', 'left')}/>
      <span className={classNames('separator-title')}>{props.regionTitle.toUpperCase()}</span>
      <span className={classNames('separator-line', 'right')}/>
    </div>
  )
};

export const StyledRfiRegionDivider = styled(RfiRegionDivider)`
  height: 32px;
  font-family: ${theme.font.familyRegion};
  font-weight: ${theme.font.weightRegion};
  font-size: ${theme.font.sizeRegion};
  color: ${theme.color.fontPrimary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4px;
  
  .separator-line {
    flex-grow: 1;
    height: 4px;
    border-radius: 4px;
    background: ${theme.color.fontPrimary};
    margin-top: 22px;
    margin-bottom: 8px;
  }
  
  .separator-title {
    margin-left: 2px;
    margin-right: 2px;
    text-align: center;
  }
`;
