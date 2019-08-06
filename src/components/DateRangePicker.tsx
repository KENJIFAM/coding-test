import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
// import { WithStyles, Theme } from '@material-ui/core';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Helmet from 'react-helmet';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import { updateDateRange } from 'actions';
import { ReduxState } from 'services/types';
import { DateRange } from 'common/types';

interface DispatchProps {
  updateDateRange: (range: DateRange) => void;
}

interface StateToProps {
  range: DateRange;
}

type Props = DispatchProps & StateToProps & RouteComponentProps<{}>;

type State = DateRange;

class DateRangePicker extends React.Component<Props, State> {

  private ref: DayPickerInput;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      from: new Date(),
      to: new Date()
    };
  }

  componentDidMount() {
    const range = this.props.range;
    this.setState({ ...range });
  }

  showFromMonth = () => {
    const { from, to } = this.props.range;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.ref.getDayPicker().showMonth(from);
    }
  }

  handleFromChange = (from: Date) => {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  }

  handleToChange = (to: Date) => {
    this.setState({ to });
    this.props.updateDateRange(this.state);
    this.showFromMonth();
  }

  render() {
    const { from, to } = this.props.range;
    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={from}
          placeholder="From"
          format="LL"
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.ref.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
        />{' '}
        —{' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={(el: DayPickerInput) => (this.ref = el)}
            value={to}
            placeholder="To"
            format="LL"
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <Helmet>
          <style>{`
            .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
              background-color: #f0f8ff !important;
              color: #4a90e2;
            }
            .InputFromTo .DayPicker-Day {
              border-radius: 0 !important;
            }
            .InputFromTo .DayPicker-Day--start {
              border-top-left-radius: 50% !important;
              border-bottom-left-radius: 50% !important;
            }
            .InputFromTo .DayPicker-Day--end {
              border-top-right-radius: 50% !important;
              border-bottom-right-radius: 50% !important;
            }
            .InputFromTo .DayPickerInput-Overlay {
              width: 557px;
              margin-left: -162px;
            }
            .InputFromTo-to .DayPickerInput-Overlay {
              margin-left: -281px;
            }
            .InputFromTo input {
              text-align: center;
              font-size: 1rem;
              line-height: 1rem;
              width: 100px;
            }
            .DayPickerInput:before {
              left: 0;
              right: 0;
              bottom: 0;
              content: "";
              position: absolute;
              transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              border-bottom: 1px solid rgba(0, 0, 0, 0.42);
              pointer-events: none;
            }
            .DayPickerInput:after {
              left: 0;
              right: 0;
              bottom: 0;
              content: "";
              position: absolute;
              transform: scaleX(0);
              transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
              border-bottom: 2px solid rgb(21, 32, 47);
              pointer-events: none;
            }
            .DayPickerInput {
              color: rgba(0, 0, 0, 0.87);
              cursor: text;
              position: relative;
              line-height: 1.1875em;
              font-size: 1.6rem;
            }
            .DayPickerInput:hover::before {
              border-bottom: 2px solid rgba(0, 0, 0, 0.87);
            }
            .DayPickerInput input {
              text-align: center;
              font-size: 1rem;
              line-height: 1rem;
              width: 100px;
              border: 0;
              margin: 0;
              padding: 6px 0 7px;
              display: block;
              min-width: 0;
              box-sizing: content-box;
              background: none;
              -webkit-tap-highlight-color: transparent;
            }
          `}</style>
        </Helmet>
      </div>
    );
  }
}

const mapStateToProps = ({ range }: ReduxState): StateToProps => {
  return { range };
};

const dispatchProps: DispatchProps = {
  updateDateRange
};

export default withRouter(connect<StateToProps, DispatchProps>(mapStateToProps, dispatchProps)(DateRangePicker));