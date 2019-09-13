import React from 'react';

interface Props {
  title: string;
  updateTitle: (e: any) => void;
}

const TitleInput: React.FC<Props> = props => {
  return (
    <div>
      <div className={'title'}>title: {props.title}</div>
      <input onChange={(e: any) => props.updateTitle(e)}/>
    </div>
  );
};


export default TitleInput;