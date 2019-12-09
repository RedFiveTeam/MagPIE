import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  text: string;
  className?: string;
}

export const UnsortableHeaderCell: React.FC<Props> = props => {
  return (
    <div
      className={classNames('header-cell', props.className)}
    >
      <span className={'header--' + props.text.toLowerCase()}>
        {props.text}
      </span>
    </div>
  )
};

export const StyledUnsortableHeaderCell = styled(UnsortableHeaderCell)`
  display: flex;
  flex-direction: row;
  margin-left: 5px;
`;
