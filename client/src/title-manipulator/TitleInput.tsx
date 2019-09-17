import React from 'react';
import classNames from 'classnames';
import { Input, Title } from '../styles/theme';
import styled from 'styled-components';

interface Props {
  title: string;
  updateTitle: (e: any) => void;
  className?: string;
}

const TitleInput: React.FC<Props> = props => {
  return (
    <div className={classNames('title-box', props.className)}>
      <Title className={'title'}>title: {props.title}</Title>
      <Input className={'input'} onChange={(e: any) => props.updateTitle(e)}/>
    </div>
  );
};


export default styled(TitleInput)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  
  .title {
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: bold;
  }
`;
