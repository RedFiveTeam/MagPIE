import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  text: string;
  className?: string;
}

export const TgtTableHeaderCell: React.FC<Props> = props => {
  return (
    <div
      className={classNames('header-cell', props.className)}
    >
      <span className={'header--' + props.text.split(' ')[props.text.split(' ').length - 1].toLowerCase()}>
        {props.text}
      </span>
    </div>
  )
};

export const StyledTgtTableHeaderCell = styled(TgtTableHeaderCell)`
  display: flex;
  flex-direction: row;
  margin-left: 8px;
`;
