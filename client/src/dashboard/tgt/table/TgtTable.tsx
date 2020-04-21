import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../../resources/theme';
import ScrollShadow from '../../components/scroll-shadow';

interface Props {
  className?: string;
}

export const TgtTable: React.FC<Props> = props => {
  return (
    <div className={classNames('tgt-table-wrapper', props.className)} id={'tgt-table-scrollable-region'}>
      <ScrollShadow
        bottomShadowColors={{
          active: 'linear-gradient(to top, #000000 0%, #00000000 100%);',
          inactive: theme.color.backgroundBase,
        }}
        topShadowColors={{
          active: 'linear-gradient(to bottom, #000000 0%, #00000000 100%);',
          inactive: theme.color.backgroundBase,
        }}
        shadowSize={10}
      >
        <div className={'tgt-table'}>
          {props.children}
        </div>
      </ScrollShadow>
    </div>
  );
};

export const StyledTgtTable = styled(TgtTable)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 56px;
  height: 100%;
  margin-left: 5px;
  
  .tgt-table {
    display: flex;
    flex-direction: column;
    padding-right: 15px;
  }
`;
