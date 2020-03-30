import { Theme, Tooltip, withStyles } from '@material-ui/core';
import theme from '../../resources/theme';

// @ts-ignore
const TextTooltip = withStyles((localTheme: Theme) => ({
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

export default TextTooltip;
