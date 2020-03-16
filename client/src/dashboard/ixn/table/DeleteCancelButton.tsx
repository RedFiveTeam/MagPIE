import * as React from 'react';
import { Theme, Tooltip, withStyles } from '@material-ui/core';
import theme from '../../../resources/theme';

interface DeleteButtonProps {
  handleClick: () => void;
  title: string;
  buttonClassName: string;
  className?: string;
}

export const DeleteCancelButton: React.FC<DeleteButtonProps> = props => {
  // @ts-ignore
  const CellTooltip = withStyles((localTheme: Theme) => ({
    tooltip: {
      backgroundColor: theme.color.backgroundToolTip,
      color: theme.color.fontToolTip,
      width: 'inherit',
      height: 22,
      borderRadius: 11,
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }))(Tooltip);

  return (
    <div className={props.className}>
      <CellTooltip title={props.title}>
        <div className={props.buttonClassName}
             onClick={props.handleClick}
        >
          {props.children}
        </div>
      </CellTooltip>
    </div>
  );
};
