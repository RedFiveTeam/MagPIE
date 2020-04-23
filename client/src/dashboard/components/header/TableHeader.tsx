import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { StyledTableHeaderCell } from './TableHeaderCell';
import theme from '../../../resources/theme';

interface Props {
  headers: string[];
  className?: string;
}

export const TableHeader: React.FC<Props> = props => {

  return (
    <div className={classNames('table-header', props.className)}>
      {props.headers.map(value =>
        <StyledTableHeaderCell
          text={value}
          className={'header-cell--' + value.split(' ')[value.split(' ').length - 1].toLowerCase()}
          key={value}
        />
      )}
    </div>
      );
};

export const StyledTableHeader = styled(TableHeader)`
  font-family: ${theme.font.familyHeader};
  color: ${theme.color.fontPrimary};
  font-weight: ${theme.font.weightHeader};
  font-size: ${theme.font.sizeHeaderSmall};
  margin-top: 21px;
  height: 33px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8px;
`;
