import dayjs from 'dayjs';

export const dataConvert = (input: string | Date) => {
  return dayjs(input).format('YYYY-MM-DD HH:mm');
};
