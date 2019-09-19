import React from 'react';
import classNames from 'classnames';
import { Fact } from '../styles/theme';
import styled from 'styled-components';

interface Props {
  fact: string;
  className?: string;
}

const DisplayFact: React.FC<Props> = props => {
  return (
    <div className={classNames('fact-box', props.className)}>
      <Fact className={'fact'}>Fact: {props.fact}</Fact>
    </div>
  );
};


export default styled(DisplayFact)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  
  .fact {
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: bold;
  }
`;
