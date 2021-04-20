import { StatusEnum } from '@/api/api';

export const STATUS_ACTIVE = 'Hoạt động';
export const STATUS_INACTIVE = 'Không hoạt động';

export const STATUS_OPTIONS = [
  { value: StatusEnum.Active, text: STATUS_ACTIVE },
  { value: StatusEnum.Inactive, text: STATUS_INACTIVE }
];
