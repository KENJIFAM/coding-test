import * as React from 'react';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

interface OwnProps {
  onChangePage: (event: React.MouseEvent<HTMLElement, MouseEvent> | null, page: number) => void;
  page: number;
  count: number;
  rowsPerPage: number;
  theme: Theme;
}

type Props = OwnProps & WithStyles<typeof styles>;

const TableActions = (props: Props) => {
  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    props.onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    props.onChangePage(event, props.page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    props.onChangePage(event, props.page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    props.onChangePage(
      event,
      Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1),
    );
  };

  const { classes, count, page, rowsPerPage, theme } = props;

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const styles = (theme: Theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

export default withStyles(styles, { withTheme: true })(TableActions);