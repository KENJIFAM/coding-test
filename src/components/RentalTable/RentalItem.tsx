import { withStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const styles = (theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
});

export default withStyles(styles)(TableCell);

