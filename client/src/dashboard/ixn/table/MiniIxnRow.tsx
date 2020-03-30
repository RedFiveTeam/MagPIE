import * as React from 'react';
import IxnModel from '../../../store/ixn/IxnModel';
import { Box } from '@material-ui/core';
import classNames from 'classnames';
import styled from 'styled-components';

interface MyProps {
  ixn: IxnModel;
  className?: string;
}

export const MiniIxnRow: React.FC<MyProps> = props => {

  return (
    <div className={props.className}>
      <Box
        borderRadius={8}
        className={'ixn-row-box'}
      >
        <div className={classNames('mini-ixn-data-cell', 'time')}>
          {props.ixn.time.utc().format('HH:mm:ss') + 'Z'}
        </div>
        <div className={classNames('mini-ixn-data-cell', 'mini-activity')}>
          {props.ixn.activity ? props.ixn.activity : '\xa0'}
        </div>
      </Box>
    </div>
  );
};

export const StyledMiniIxnRow = styled(MiniIxnRow)`
 .mini-ixn-data-cell {
    margin: 14px 4px 8px 4px;
    padding-bottom: 6px;
    overflow-wrap: break-word;
    border-bottom: 1px solid #FFFFFF;
  }
  
  .ixn-row-box {
    margin-top: 1px !important;
    margin-bottom: 1px !important;
  }
  
  .mini-activity {
    width: 345px;
  }
`;
