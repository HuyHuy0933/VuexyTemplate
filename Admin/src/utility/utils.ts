import { DropdownOption } from './dropdowns/dropdownOptions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumToDropdownOptions(enumme: any): DropdownOption[] {
  const keys = Object.keys(enumme);
  const array = keys
    .filter((_, index) => index >= keys.length / 2)
    .map((key) => new DropdownOption(enumme[key], key));
  return array;
}

export function formatCurrency(num: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}
