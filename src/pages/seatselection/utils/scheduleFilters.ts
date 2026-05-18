import { FilterValue, SortOrder } from 'antd/es/table/interface';
import { getStorage, setStorage } from '@/utils/store';
import { uniqueValues } from './common';

export const ME_FILTER_VALUE = '__me';
export const TAG_FILTER_PREFIX = 'tag:';
export const USER_FILTER_PREFIX = 'user:';

const STORAGE_KEY = 'seatselection.schedule.tableParams';

export interface StoredTableParams {
  filters?: Record<string, FilterValue | null>;
  sorter?: {
    columnKey?: string;
    order?: SortOrder;
  };
}

interface StoredTagFilters {
  tags?: string[];
}

export function normalizeFilterValues(value?: FilterValue | null): string[] {
  return value?.map(String) || [];
}

export function getStoredTagFilters(
  filters: Record<string, FilterValue | null>,
): string[] {
  return normalizeFilterValues(filters.nickname)
    .filter((value) => value.startsWith(TAG_FILTER_PREFIX))
    .map((value) => value.slice(TAG_FILTER_PREFIX.length));
}

export function getStoredTableParams(): StoredTableParams {
  const value = getStorage(STORAGE_KEY);
  if (!value || typeof value !== 'object') {
    return {};
  }

  const stored = value as StoredTagFilters;
  const tagValues = stored.tags?.map((tag) => `${TAG_FILTER_PREFIX}${tag}`);

  if (!tagValues?.length) {
    return {};
  }

  return {
    filters: {
      nickname: tagValues,
    },
  };
}

export function storeTableFilters(
  filters: Record<string, FilterValue | null>,
): void {
  setStorage(STORAGE_KEY, { tags: getStoredTagFilters(filters) });
}

export function getSelectedTags(nicknameFilters: string[]): string[] {
  return uniqueValues(
    nicknameFilters
      .filter((value) => value.startsWith(TAG_FILTER_PREFIX))
      .map((value) => value.slice(TAG_FILTER_PREFIX.length)),
  );
}

export function getSelectedUsers(
  nicknameFilters: string[],
  currentUserId?: string,
): string[] {
  return uniqueValues(
    nicknameFilters.flatMap((value) => {
      if (value.startsWith(USER_FILTER_PREFIX)) {
        return [value.slice(USER_FILTER_PREFIX.length)];
      }

      if (value === ME_FILTER_VALUE && currentUserId) {
        return [currentUserId];
      }

      return [];
    }),
  );
}
