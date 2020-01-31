import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const TgtTable: React.FC<Props> = props => {
  return (
    <div className={classNames('tgt-table-wrapper', props.className)}>
      <div className={'tgt-table'}>
        {props.children}
      </div>
    </div>
  )
};

export const StyledTgtTable = styled(TgtTable)`
  display: flex;
  flex-direction: column;
  padding-bottom: 99px;
  padding-right: 20px;
  overflow-y: auto;
  width: 1346px;
`;
