import * as React from 'react';
import IconExternalLink from '../../resources/ExternalLinkVector';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  text: string;
  sort: () => void;
  className?: string;
}

export const HeaderCell: React.FC<Props> = props => {
  return (
    <div
      className={classNames('header-cell', props.className)}
      onClick={props.sort}
    >
      <span className={'header--' + props.text.toLowerCase()}>
        {props.text}
      </span>
      <span className={classNames('icon--sort', 'sort--' + props.text)}>
        <IconExternalLink/>
      </span>
    </div>
  )
};

export const StyledHeaderCell = styled(HeaderCell)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  
  .icon--sort {
    margin-left: 5px;
  }
`;
