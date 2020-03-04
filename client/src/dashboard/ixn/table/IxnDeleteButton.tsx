import * as React from 'react';
import { Theme, Tooltip, withStyles } from '@material-ui/core';
import theme from '../../../resources/theme';
import { StyledDeleteButtonTrashcan } from '../../../resources/icons/DeleteButtonTrashcan';

interface DeleteButtonProps {
  handleClick: () => void;
  className?: string;
}

export const IxnDeleteButton: React.FC<DeleteButtonProps> = props => {
  // @ts-ignore
  const DeleteTooltip = withStyles((localTheme: Theme) => ({
    tooltip: {
      backgroundColor: theme.color.backgroundToolTip,
      color: theme.color.fontToolTip,
      width: 120,
      height: 22,
      borderRadius: 11,
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }))(Tooltip);

  return (
    <div className={props.className}>
      <DeleteTooltip title={'Delete Interaction'}>
        <div className={'delete-ixn-button'}
             onClick={props.handleClick}
        >
          <StyledDeleteButtonTrashcan />
        </div>
      </DeleteTooltip>
    </div>
  );
};
