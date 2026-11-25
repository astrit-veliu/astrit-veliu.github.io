const full = new Intl.NumberFormat('en-US');
const short = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 0 });

export const formatInstalls = (count, { compact = false } = {}) => `${(compact ? short : full).format(count)}+`;

export const formatRating = (value) => value.toFixed(1);
