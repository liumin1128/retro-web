import dayjs from 'dayjs';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  ColumnFilterItem,
  ColumnsType,
  SortOrder,
} from 'antd/es/table/interface';
import Avatar from '@/components/Avatar/Thumbnail';
import { UserFieldsFragment } from '@/generated/graphql';
import {
  ME_FILTER_VALUE,
  StoredTableParams,
  TAG_FILTER_PREFIX,
  USER_FILTER_PREFIX,
} from '@/pages/seatselection/utils/scheduleFilters';
import { getHolidayName } from '@/pages/seatselection/utils/holidays';
import StyledTableCell from './components/StyledTableCell';
import { DayHeader, MonthHeader } from './components/ScheduleTableHeader';
import { getDayInfo } from './utils';
import { Info, RowItem } from './types';

interface BuildColumnsArgs {
  startDate: number;
  days: dayjs.Dayjs[];
  rows: RowItem[];
  tableParams: StoredTableParams;
  tagFilters: ColumnFilterItem[];
  filterUsers: UserFieldsFragment[];
  currentUserId?: string;
  isAdmin?: boolean;
  onClickCell: (day: dayjs.Dayjs, row: RowItem) => void;
}

function getColumnSortOrder(
  tableParams: StoredTableParams,
  columnKey: string,
): SortOrder | null {
  if (tableParams.sorter?.columnKey !== columnKey) {
    return null;
  }

  return tableParams.sorter?.order || null;
}

function getSortableText(info: Info): string {
  const text = info.seat?.id || info.status || '0';

  if (text === 'Office') {
    return '0';
  }

  return text;
}

function getCellText(info: Info): string | undefined {
  const text = info.seat?.id || info.status;

  if (text === 'Office') {
    return '';
  }

  return text;
}

function buildNicknameFilters({
  tagFilters,
  filterUsers,
}: {
  tagFilters: ColumnFilterItem[];
  filterUsers: UserFieldsFragment[];
}): ColumnFilterItem[] {
  return [
    ...tagFilters,
    {
      text: 'Me',
      value: ME_FILTER_VALUE,
    },
    {
      text: 'more',
      value: 'more',
      children: filterUsers.map((user) => {
        return {
          text: user.nickname,
          value: `${USER_FILTER_PREFIX}${user._id}`,
        };
      }),
    },
  ];
}

function matchesNicknameFilter({
  filterValue,
  record,
  currentUserId,
}: {
  filterValue: string;
  record: UserFieldsFragment;
  currentUserId?: string;
}): boolean {
  if (filterValue === ME_FILTER_VALUE) {
    return record._id === currentUserId;
  }

  if (filterValue.startsWith(TAG_FILTER_PREFIX)) {
    const tag = filterValue.slice(TAG_FILTER_PREFIX.length);
    return !!record.tags?.includes(tag);
  }

  if (filterValue.startsWith(USER_FILTER_PREFIX)) {
    const userId = filterValue.slice(USER_FILTER_PREFIX.length);
    return record._id === userId;
  }

  return false;
}

export function buildColumns({
  startDate,
  days,
  rows,
  tableParams,
  tagFilters,
  filterUsers,
  currentUserId,
  isAdmin,
  onClickCell,
}: BuildColumnsArgs): ColumnsType<RowItem> {
  return [
    {
      key: 'nickname',
      fixed: 'left',
      width: 128,
      filteredValue: tableParams.filters?.nickname || null,
      filters: buildNicknameFilters({ tagFilters, filterUsers }),
      showSorterTooltip: false,
      onFilter: (value, record): boolean => {
        return matchesNicknameFilter({
          filterValue: String(value),
          record,
          currentUserId,
        });
      },
      sorter: (a, b): number =>
        (a.tags?.join(',') || '').localeCompare(b.tags?.join(',') || ''),
      sortOrder: getColumnSortOrder(tableParams, 'nickname'),
      title: () => <MonthHeader startDate={startDate} />,
      render: (_, row: UserFieldsFragment) => {
        return (
          <Stack direction="row" spacing={1} sx={{ px: 1 }}>
            <Avatar
              size={24}
              sx={{ width: '20px', height: '20px' }}
              src={row.avatarUrl as string}
            />

            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                fontSize: 14,
              }}
            >
              {row.nickname}
            </Typography>
          </Stack>
        );
      },
    },
    {
      key: 'wfhDays',
      dataIndex: 'wfhDays',
      title: 'WFH',
      width: 64,
      align: 'center',
      showSorterTooltip: false,
      sorter: (a, b) => a.wfhDays - b.wfhDays,
      sortOrder: getColumnSortOrder(tableParams, 'wfhDays'),
    },
    {
      key: 'alDays',
      title: 'AL',
      dataIndex: 'alDays',
      width: 64,
      align: 'center',
      showSorterTooltip: false,
      sorter: (a, b) => a.alDays - b.alDays,
      sortOrder: getColumnSortOrder(tableParams, 'alDays'),
    },
    ...days.map((day): ColumnsType<RowItem>[number] => {
      const key = day.format('D');
      const statusList = rows.map((row) => getDayInfo(row, key).status);
      const wfhDaysCount = statusList.filter(
        (status) => status === 'WFH',
      ).length;
      const officeCount = statusList.filter(
        (status) => status === 'Office',
      ).length;
      const holiday = getHolidayName(day);

      return {
        key,
        title: () => (
          <DayHeader
            day={day}
            officeCount={officeCount}
            wfhDaysCount={wfhDaysCount}
            userCount={rows.length}
          />
        ),
        dataIndex: key,
        width: 64,
        align: 'center' as const,
        showSorterTooltip: false,
        sorter: (a: RowItem, b: RowItem) => {
          return getSortableText(getDayInfo(a, key)).localeCompare(
            getSortableText(getDayInfo(b, key)),
          );
        },
        sortDirections: ['descend' as SortOrder],
        sortOrder: getColumnSortOrder(tableParams, key),
        render: (info: Info, row: RowItem) => {
          const text = getCellText(info);
          const canEdit = isAdmin || (row.isMe && day.isAfter(dayjs(), 'day'));
          const onClick = canEdit
            ? () => {
                onClickCell(day, row);
              }
            : undefined;
          const cell = (
            <StyledTableCell
              key={key}
              onClick={onClick}
              status={info?.status}
              workingDay={info?.workingDay}
              hasSeat={!!info?.seat?.id}
              holiday={!!holiday}
            >
              {text || holiday}
            </StyledTableCell>
          );

          if (!info?.comment) {
            return cell;
          }

          return (
            <Tooltip key={key} title={info.comment} placement="top" arrow>
              {cell}
            </Tooltip>
          );
        },
      };
    }),
  ];
}
