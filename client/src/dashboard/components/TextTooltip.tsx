import { Theme, Tooltip, withStyles } from '@material-ui/core';
import theme from '../../resources/theme';
import styled from 'styled-components';

// @ts-ignore
const TextTooltip = withStyles((localTheme: Theme) => ({
  tooltip: {
    backgroundColor: theme.color.backgroundToolTip,
    color: theme.color.fontPrimary,
    width: 'inherit',
    height: 22,
    borderRadius: 11,
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))(Tooltip);

export default TextTooltip;

export const StyledTextTooltip = styled(TextTooltip)`
  display: flex;
  z-index: 10001 !important;
`
