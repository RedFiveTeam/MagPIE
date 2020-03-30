import * as React from 'react';
import TextTooltip from '../../components/TextTooltip';

interface DeleteButtonProps {
  handleClick: () => void;
  title: string;
  buttonClassName: string;
  className?: string;
}

export const DeleteCancelButton: React.FC<DeleteButtonProps> = props => {


  return (
    <div className={props.className}>
      <TextTooltip title={props.title}>
        <div className={props.buttonClassName}
             onClick={props.handleClick}
        >
          {props.children}
        </div>
      </TextTooltip>
    </div>
  );
};
