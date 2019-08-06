import { DateRange } from 'common/types';

export type ReportActions = UpdateDateRange;

interface UpdateDateRange {
  type: 'UPDATE_DATE_RANGE',
  range: DateRange
}

export const updateDateRange = (range: DateRange): UpdateDateRange => {
  return {
    type: 'UPDATE_DATE_RANGE',
    range
  };
};