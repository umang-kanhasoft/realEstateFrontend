import { SORT_MAPPING } from '@/constants/project.constants';

/**
 * Converts a budget string (e.g., "50 Lac", "1.5 Cr") to a number.
 * Note: Handles various formats including raw numbers, "Lac", "Cr", and "₹" symbols.
 */
export const budgetToNumber = (budget: string): number | undefined => {
  if (!budget) return undefined;

  // If it's already a clean number string, just parse it
  if (!isNaN(Number(budget))) {
    return parseFloat(budget);
  }

  const clean = budget
    .toLowerCase()
    .replace(/₹|rs\.?|,|\s/gi, '')
    .trim();

  if (clean.includes('cr')) {
    return parseFloat(clean) * 10000000; // Crore
  } else if (clean.includes('lac') || clean.includes('l')) {
    return parseFloat(clean) * 100000; // Lakh
  } else if (clean.includes('k')) {
    return parseFloat(clean) * 1000; // Thousand
  }

  return parseFloat(clean);
};

/**
 * Converts a numeric value back to a budget string matching BUDGET_OPTIONS format.
 * Examples: 2000000 -> '20 Lac', 10000000 -> '1 Cr', 15000000 -> '1.5 Cr'
 */
export const numberToBudget = (amount: number): string => {
  if (!amount) return '';

  // Check for Crore (1 Cr = 10,000,000)
  if (amount >= 10000000) {
    const crValue = amount / 10000000;
    // Format without trailing zeros: 1.0 -> '1', 1.5 -> '1.5'
    const formatted =
      crValue % 1 === 0 ? crValue.toFixed(0) : crValue.toFixed(1);
    return `${formatted} Cr`;
  }

  // Check for Lac (1 Lac = 100,000)
  if (amount >= 100000) {
    const lacValue = amount / 100000;
    const formatted =
      lacValue % 1 === 0 ? lacValue.toFixed(0) : lacValue.toFixed(1);
    return `${formatted} Lac`;
  }

  // For smaller amounts, just return as is
  return amount.toString();
};

/**
 * Maps frontend sort labels to API sort parameters.
 */
export const mapSortToApi = (sortLabel: string) => {
  return SORT_MAPPING[sortLabel] || SORT_MAPPING['Featured'];
};

/**
 * Maps API sort parameters back to frontend labels.
 */
export const mapApiToSort = (sortBy: string, sortOrder: string): string => {
  const entry = Object.entries(SORT_MAPPING).find(
    ([_, value]) => value.sortBy === sortBy && value.sortOrder === sortOrder
  );
  return entry ? entry[0] : 'Featured';
};

/**
 * Constants for URL keys to ensure consistency
 */
export const URL_KEYS = {
  CITY: 'city',
  AREA: 'area', // comma separated
  SEARCH: 'q',
  MIN_PRICE: 'priceMin',
  MAX_PRICE: 'priceMax',
  BHK: 'bhk', // comma separated
  PROPERTY_TYPE: 'propertyType', // comma separated
  POSSESSION: 'possession', // comma separated
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
};
