import moment from 'moment';
import format from 'format-number';

export const dateFormat = (value) => moment(value).calendar();

export const sumFormat = (value) => format({ suffix: ' Æ' })(value);
