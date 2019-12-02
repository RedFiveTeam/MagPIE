import React from 'react';
import styled from 'styled-components';
import { StyledRFIRegionDivider } from './RFIRegionDivider';
import classNames from 'classnames';

interface Props {
  title: string;
  emptyMessage: string;
  className?: string;
}

export const Region: React.FC<Props> = props => {

  function displayMessage() {
    return <div className={'empty-message'}>{props.emptyMessage}</div>;
  }

  return (
    <div className={classNames('region', `region--${props.title}`, props.className)}>
      <StyledRFIRegionDivider regionTitle={props.title}/>
      {React.Children.count(props.children) === 0 ? displayMessage() : props.children}
    </div>
  )
};

export const StyledRegion = styled(Region)`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  
  .empty-message {
    color: ${(props) => props.theme.color.fontPrimary};
    font-family: ${(props) => props.theme.font.familyRegion};
    font-weight: ${(props) => props.theme.font.weightRegion};
    font-size: ${(props) => props.theme.font.sizeRegion};
    margin-top: 16px;
    text-align: center;
    opacity: 50%;
  }
`;

