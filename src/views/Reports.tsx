import * as React from 'react';
import { connect } from 'react-redux';
import { db } from 'services/firebase';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import { ReduxState } from 'services/types';
import { RemoteData, InStoreApi, ShopApi, DateRange } from 'common/types';
import Container from 'components/Container';
import Typography from '@material-ui/core/Typography';
import DateRangePicker from 'components/DateRangePicker';
import RentalTable from 'components/RentalTable';

interface State {
    rentals: RemoteData<InStoreApi[]>;
}

interface StateToProps {
    shop: ShopApi;
    range: DateRange;
}

type Props = StateToProps & WithStyles<typeof styles>;

class Reports extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            rentals: { kind: 'LOADING' }
        };
    }

    componentDidMount() {
        this.getRentals();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (JSON.stringify(prevProps.range) !== JSON.stringify(this.props.range)) {
            this.getRentals();
        }
    }

    getRentals() {
        const shopId = this.props.shop.id;
        const { from, to } = this.props.range;
        const rentalsRef = db.collection('rentals')
            .where('shopId', '==', shopId)
            .where('rentalState', '==', 'COMPLETED')
            .where('endDate', '>=', from.toISOString())
            .where('endDate', '<=', to.toISOString())
            .orderBy('endDate', 'asc');
        rentalsRef.get().then((querySnapshot) => {
            const rentalList: InStoreApi[] = [];
            for (const rentalDoc of querySnapshot.docs) {
                const rental = rentalDoc.data() as InStoreApi;
                rentalList.push(rental);
            }
            const rentals: RemoteData<InStoreApi[]> = { kind: 'FETCHED', data: rentalList };
            this.setState({
                rentals
            });            
        }, (error) => {
            const rentals: RemoteData<InStoreApi[]> = { kind: 'ERROR', error: error.message };
            this.setState({
                rentals
            });
        });
    }

    renderRentals() {
        const rentals = this.state.rentals;
        if (rentals.kind === 'LOADING') {
            return <div>Loading</div>;
        }
        if (rentals.kind === 'ERROR') {
            return <div>{rentals.error}</div>;
        }
        
        const rentalData = rentals.data;

        return (
            <RentalTable rentals={rentalData}/>
        );
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container>
                <Typography variant="h5" gutterBottom className={classes.header}>
                    Dummy report
                </Typography>
                <div className={classes.filter}>
                    <span className={classes.label}>
                        Chose time
                    </span>
                    <span className={classes.picker}>
                        <DateRangePicker />
                    </span>
                </div>
                {this.renderRentals()}
            </Container>
        );
    }
}

const mapStateToProps = ({ shops, range }: ReduxState): StateToProps => {
    const { activeShop } = shops;
    return { shop: activeShop!, range };
};

const styles = (theme: Theme) => createStyles({
    header: {
        marginBottom: 10,
    },
    leftAlign: {
        textAlign: 'left',
    },
    filter: {
        textAlign: 'right',
    },
    label: {
        display: 'inline-block',
        fontSize: 18,
        marginRight: 20,
    },
    picker: {
        display: 'inline-block',
    },
});

export default withStyles(styles)(connect(mapStateToProps, {})(Reports));
