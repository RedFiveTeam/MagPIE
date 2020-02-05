import * as React from 'react';
import classNames from 'classnames';
import { StyledUnsortableTableHeaderCell } from '../../rfi-page/header/UnsortableTableHeaderCell';
import styled from 'styled-components';

interface Props {
  className?: string;
}

export const TgtTableHeader: React.FC<Props> = props => {
  let headers: string[] = ['TGT Name', 'MGRS', 'EEI Notes', 'TGT Description', 'Status', 'Delete', 'Exploitation'];

  return (
    <div className={classNames('header', props.className)}>
      {headers.map(value =>
        <StyledUnsortableTableHeaderCell
          text={value}
          className={'header-cell--' + value.split(' ')[value.split(' ').length - 1].toLowerCase()}
          key={value}
        />
      )}
    </div>
      );
};

export const StyledTgtTableHeader = styled(TgtTableHeader)`
  font-family: ${(props) => props.theme.font.familyHeader};
  color: ${(props) => props.theme.color.fontPrimary};
  font-weight: ${(props) => props.theme.font.weightHeader};
  font-size: ${(props) => props.theme.font.sizeHeaderSmall};
  margin-top: 21px;
  height: 33px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8px;
  
  .header-cell--name {
    width: 123px;
  }
  
  .header-cell--mgrs {
    width: 163px;
  }
  
  .header-cell--notes {
    width: 397px;
  }
  
  .header-cell--description {
    width: 270px;
  }
  
  .header-cell--status {
    width: 128px;
  }
  
  .header-cell--delete {
    width: 70px;
  }
  
  .header-cell--exploitation {
    width: 128px;
  }
`;
