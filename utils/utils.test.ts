import { formatCurrency } from './utils';

describe('formatCurrency', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(1000)).toBe('€10.00');
  });

  it('should handle zero value', () => {
    expect(formatCurrency(0)).toBe('€0.00');
  });
});
