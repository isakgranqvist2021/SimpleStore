import currency from 'currency.js';
import Dayjs from 'dayjs';

export function formatCurrency(value: number) {
  return currency(value / 100).format({ symbol: '€' });
}

export function formatDate(date: Dayjs.ConfigType) {
  return Dayjs(date).format('DD MMM YYYY HH:MM');
}
