import * as React from 'react';
import { Box } from '@material-ui/core';
import theme from '../../../resources/theme';
import { StatusButtonProps } from './NotStartedButton';
import DoesNotMeetEeiIcon from '../../../resources/icons/DoesNotMeetEeiIcon';

const DoesNotMeetEeiButton: React.FC<StatusButtonProps> = props => {
  return (
    <div className={props.className}>
      <Box
        height={32}
        width={110}
        border={2}
        borderRadius={16}
        borderColor={theme.color.buttonDoesNotMeetEei}
        bgcolor={theme.color.backgroundModal}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingRight={0.25}
        paddingLeft={1.25}
        className={props.buttonClass}
        zIndex={1000}
        color={theme.color.fontPrimary}
        fontSize={12}
        fontWeight={'bold'}
        onClick={props.onClick}
      >
        Does not meet EEI
        <DoesNotMeetEeiIcon/>
      </Box>
    </div>
  );
};

export default DoesNotMeetEeiButton;

