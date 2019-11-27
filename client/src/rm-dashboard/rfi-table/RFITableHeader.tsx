import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import IconSort from '../../resources/Vector';

interface Props {
  className?: string;
  sortKey: string;
  orderAscending: boolean;
  callback: (newKey: string) => void;
}

export const RFITableHeader: React.FC<Props> = props => {

  function handleClick(key: string) {
    props.callback(key);
  }

  return (
    <div className={classNames('header', props.className)}>
      <span className={'header--id'}>RFI
      <button
        className={'sort--id'}
        onClick={() => handleClick('id')}>
        <IconSort/>
      </button>
      </span>
      <span className={'header--country'}>CC
      <button
        className={'sort--country'}
        onClick={() => handleClick('country')}>
        <IconSort/>
      </button>
        </span>
      <span className={'header--customer'}>Customer
        <button
          className={'sort--unit'}
          onClick={() => handleClick('unit')}>
          <IconSort/>
        </button>
      </span>
      <span className={'header--ltiov'}>LTIOV
        <button
          className={'sort--ltiov'}
          onClick={() => handleClick('ltiov')}>
          <IconSort/>
        </button>
      </span>
    </div>
  );
};


export const StyledRFITableHeader = styled(RFITableHeader)`
  font-family: ${(props) => props.theme.font.familyHeader};
  color: ${(props) => props.theme.color.fontPrimary};
  font-weight: ${(props) => props.theme.font.weightHeader};
  font-size: ${(props) => props.theme.font.sizeHeader};
  margin-top: 64px;
  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: ${(props) => props.theme.table.leftWidth};
  text-align: center; 
  padding-left: 10px;
  flex-basis: auto;
  
  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  

`;
