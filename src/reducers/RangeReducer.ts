import { ReportActions } from 'actions';
import { DateRange } from 'common/types';

const INITIAL_STATE: DateRange = {
  from: new Date('2019-01-05'),
  to: new Date('2019-01-25')
};

export default (state: DateRange = INITIAL_STATE, action: ReportActions): DateRange => {
  switch (action.type) {
    case 'UPDATE_DATE_RANGE':
      return { ...state, ...action.range };
    default:
      return state;
  }
};