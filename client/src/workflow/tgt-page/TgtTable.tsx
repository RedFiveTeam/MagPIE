import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const TgtTable: React.FC<Props> = props => {
    return (
    <div className={classNames('tgt-table', props.className)}>
      {props.children}
    </div>
  )
};

export const StyledTgtTable = styled(TgtTable)`
  display: flex;
  flex-direction: column;
  padding-bottom: 119px;
`;