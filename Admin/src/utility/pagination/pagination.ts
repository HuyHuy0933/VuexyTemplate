export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE_SIZE_OPTIONS = [DEFAULT_PAGE_SIZE, 10, 20];

export interface Pagination {
  sortDesc?: boolean[];
  page?: number;
  itemsPerPage?: number;
  sortBy?: string[];
  totalItems?: number;
  searchText?: string;
}

export interface Header {
  text: string;
  value: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  divider?: boolean;
  class?: string | string[];
  width?: string | number;
  filter?: (value: any, search: string, item: any) => boolean;
  sort?: (a: any, b: any) => number;
}

export function getItemsPerPage(pagination: Pagination) {
  return pagination.itemsPerPage === -1 ? undefined : pagination.itemsPerPage;
}

export function getZeroBasedPageNumber(pagination: Pagination) {
  return Math.max((pagination.page || 0) - 1, 0);
}

export function getSortCriteria(pagination: Pagination) {
  return (pagination.sortBy || []).map(
    (sortBy, i) =>
      `${sortBy}|${
        pagination.sortDesc && pagination.sortDesc![i] ? 'desc' : 'asc'
      }`
  );
}

export function getValueOrUndefined<T>(
  value: T | null | undefined
): T | undefined {
  return value == null ? undefined : value;
}
