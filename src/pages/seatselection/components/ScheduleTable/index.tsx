import React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import ConfigProvider from 'antd/es/config-provider';
import AntdTable from 'antd/es/table/Table';
import { TableProps } from 'antd/es/table';
import { ColumnFilterItem, SorterResult } from 'antd/es/table/interface';
import { useTheme } from '@mui/material/styles';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import { useFindUserInfoQuery, useFindUsersQuery } from '@/generated/graphql';
import { isDefined, uniqueValues } from '@/pages/seatselection/utils/common';
import {
  ME_FILTER_VALUE,
  StoredTableParams,
  TAG_FILTER_PREFIX,
  getSelectedTags,
  getSelectedUsers,
  getStoredTableParams,
  normalizeFilterValues,
  storeTableFilters,
} from '@/pages/seatselection/utils/scheduleFilters';
import EditSchedulePanel from './components/EditSchedulePanel';
import { buildColumns } from './columns';
import useSchedule from './hooks/useSchedule';
import { getDayInfo } from './utils';
import { RowItem } from './types';
import styles from './index.less';

interface Props {
  startDate: number;
  endDate: number;
  scroll: TableProps<RowItem>['scroll'];
}

export default function CustomizedTables({
  startDate,
  endDate,
  scroll,
}: Props) {
  const theme = useTheme();

  const userInfoRes = useFindUserInfoQuery();
  const [tableParams, setTableParams] =
    React.useState<StoredTableParams>(getStoredTableParams);
  const isAdmin =
    userInfoRes.data?.findUserInfo?.tags?.includes('SeatSelectionAdmin');
  const nicknameFilters = normalizeFilterValues(tableParams.filters?.nickname);
  const selectedTags = getSelectedTags(nicknameFilters);
  const meSelected = nicknameFilters.includes(ME_FILTER_VALUE);
  const currentUserId = userInfoRes.data?.findUserInfo?._id;
  const selectedUsers = getSelectedUsers(
    nicknameFilters,
    userInfoRes.data?.findUserInfo?._id,
  );
  const shouldWaitForCurrentUser =
    meSelected && !userInfoRes.data?.findUserInfo?._id;

  const { rows, days, toggleSchedule, toggleSeat } = useSchedule({
    startDate,
    endDate,
    tags: selectedTags,
    users: selectedUsers,
    skip: shouldWaitForCurrentUser,
  });
  const filterUsersRes = useFindUsersQuery({
    variables: {
      requiredTags: ['ComTech'],
      sortKey: 'index',
      sortOrder: 1,
      limit: 1000,
    },
  });
  const filterUsers = filterUsersRes.data?.findUsers?.filter(isDefined) || [];

  const modalRef = React.useRef<ModalMethods>(null);

  const tagFilters: ColumnFilterItem[] = uniqueValues([
    ...selectedTags,
    ...filterUsers.flatMap((user) => {
      return user.tags?.filter(isDefined) || [];
    }),
  ])
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => {
      return {
        text: tag,
        value: `${TAG_FILTER_PREFIX}${tag}`,
      };
    });

  const handleTableChange: TableProps<RowItem>['onChange'] = (
    _pagination,
    filters,
    sorter,
  ) => {
    const sorterValue = Array.isArray(sorter)
      ? sorter.find((item) => item.order)
      : (sorter as SorterResult<RowItem>);
    const nextParams: StoredTableParams = {
      filters,
      sorter: sorterValue?.order
        ? {
            columnKey: String(sorterValue.columnKey || ''),
            order: sorterValue.order,
          }
        : undefined,
    };
    setTableParams(nextParams);
    storeTableFilters(filters);
  };

  const handleClickCell = (day: dayjs.Dayjs, row: RowItem) => {
    const info = getDayInfo(row, day.format('D'));
    modalRef.current?.open({
      title: `${row.nickname} ${day.format('YYYY-MM-DD')}`,
      render: () => {
        return (
          <EditSchedulePanel
            day={day}
            info={info}
            isAdmin={isAdmin}
            row={row}
            onStatusChange={async (status, comment) => {
              await toggleSchedule({
                date: day.valueOf(),
                user: row._id,
                status,
                comment,
              });
              modalRef.current?.close();
            }}
            onSeatChange={async (seat) => {
              await toggleSeat({ date: day.valueOf(), user: row._id, seat });
              modalRef.current?.close();
            }}
          />
        );
      },
    });
  };

  const columns = buildColumns({
    startDate,
    days,
    rows,
    tableParams,
    tagFilters,
    filterUsers,
    currentUserId,
    isAdmin,
    onClickCell: handleClickCell,
  });

  return (
    <>
      <TableContainer>
        <Stack className={styles.table}>
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 0,

                ...(theme.palette.mode === 'dark'
                  ? {
                      colorBgContainer: '#161C24',
                      colorText: '#fff',
                      colorBorderSecondary: 'rgba(255, 255, 255, 0.1)',
                    }
                  : {}),
              },
              components: {
                Table: {
                  paddingContentVerticalLG: 0,
                  padding: 0,
                },
              },
            }}
          >
            <AntdTable
              bordered
              rowKey="_id"
              dataSource={rows}
              columns={columns}
              pagination={false}
              scroll={scroll}
              onChange={handleTableChange}
            />
          </ConfigProvider>
        </Stack>
      </TableContainer>

      <br />
      <br />
      <br />
      <br />

      <Modal ref={modalRef} showCancel={false} showConfirm={false} />
    </>
  );
}
