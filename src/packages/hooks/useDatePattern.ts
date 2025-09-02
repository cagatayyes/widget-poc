import { useScriptAttribute } from 'casino/hooks';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Africa/Lagos');

export interface IUseDatePatternProps {
    date: string | number | Date | Dayjs | null | undefined
    pattern: string
}

export const useDatePattern = (date: string | number | Date | Dayjs | null | undefined, pattern: string): { datePattern: string} => {
	const { scriptAttributes } = useScriptAttribute();
	const datePattern: string = dayjs(date).tz(scriptAttributes.timezone).format(pattern);

	return {
		datePattern
	};
};
