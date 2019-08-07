import * as React from 'react';
import moment from 'moment';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableActions from './TableActions';
import { InStoreApi } from 'common/types';
import { TableHead } from '@material-ui/core';
import RentalItem from './RentalItem';

interface State {
  page: number;
  rowsPerPage: number;
}

interface OwnProps {
  rentals: InStoreApi[];
}

type Props = OwnProps & WithStyles<typeof styles>;

class RentalTable extends React.Component<Props, State> {
  state: State = {
    page: 0,
    rowsPerPage: 20,
  };

  handleChangePage = (event: React.MouseEvent<HTMLElement, MouseEvent> | null, page: number) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
  }

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const { rentals } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rentals.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <RentalItem>Name</RentalItem>
                <RentalItem align="right">Time</RentalItem>
                <RentalItem align="right">Amount</RentalItem>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow className={classes.row} key={row.id}>
                  <RentalItem component="th" scope="row">
                    {row.responsiblePerson.firstName + ' ' + row.responsiblePerson.lastName}
                  </RentalItem>
                  <RentalItem align="right">{moment(row.endDate).format('LLL')}</RentalItem>
                  <RentalItem align="right">{(row.charge.amount / 100).toFixed(2) + ' EUR'}</RentalItem>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow className={classes.footer}>
                <TablePagination
                  className={classes.footer}
                  rowsPerPageOptions={[10, 20, 30]}
                  colSpan={3}
                  count={rentals.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TableActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto' as 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  footer: {
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    width: 50,
  },
  select: {
    width: 50,
  }
});

export default withStyles(styles)(RentalTable);