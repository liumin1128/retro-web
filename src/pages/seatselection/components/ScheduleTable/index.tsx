import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import ConfigProvider from 'antd/es/config-provider';
import AntdTable from 'antd/es/table/Table';
import { ColumnsType } from 'antd/es/table';
import { useTheme } from '@mui/material/styles';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import { UserFieldsFragment, useFindUserInfoQuery } from '@/generated/graphql';
import Avatar from '@/components/Avatar/Thumbnail';
import SeatList from './components/SeatList';
import StatusList from './components/StatusList';
import StyledTableCell from './components/StyledTableCell';
import useSchedule, { Info, RowItem } from './hooks/useSchedule';
import styles from './index.less';

dayjs.extend(isBetween);

const holidays = {
  元旦: ['2023-12-30', '2024-01-01'],
  春节: ['2024-02-10', '2024-02-17'],
  清明: ['2024-04-04', '2024-04-06'],
  劳动节: ['2024-05-01', '2024-05-05'],
  端午: ['2024-06-08', '2024-06-10'],
  中秋: ['2024-09-15', '2024-09-17'],
  国庆: ['2024-10-01', '2024-10-07'],
};

// 元旦，春节，清明节，劳动节，端午节，中秋节，国庆节
// 元旦 - New Year's Day (NYD)
// 春节 - Spring Festival (SF)
// 清明节 - Tomb Sweeping Day (TSD)
// 劳动节 - Labor Day (LD)
// 端午节 - Dragon Boat Festival (DBF)
// 中秋节 - Mid-Autumn Festival (MAF)
// 国庆节 - National Day (ND)

interface Props {
  startDate: number;
  endDate: number;
  scroll: any;
}

export default function CustomizedTables({
  startDate,
  endDate,
  scroll,
}: Props) {
  const theme = useTheme();

  const userInfoRes = useFindUserInfoQuery();
  const isAdmin =
    userInfoRes.data?.findUserInfo?.tags?.includes('SeatSelectionAdmin');

  const { rows, days, toggleSchedule, toggleSeat } = useSchedule({
    startDate,
    endDate,
  });

  const modalRef = React.useRef<ModalMethods>(null);

  // if (userRes.loading) return <p>loading</p>;
  // if (userRes.error) return <p>error</p>;

  const handleClickCell = (day: dayjs.Dayjs, row: RowItem) => {
    const obj = row[day.format('D')] as Info;
    modalRef.current?.open({
      title: `${row.nickname} ${day.format('YYYY-MM-DD')}`,
      render: () => {
        return (
          <Stack spacing={1}>
            <Typography variant="h6" sx={{ fontSize: 12 }}>
              Status
            </Typography>
            <StatusList
              value={obj?.status}
              onChange={async (status, comment) => {
                await toggleSchedule({
                  date: day.valueOf(),
                  user: row._id,
                  status,
                  comment,
                });
                modalRef.current?.close();
              }}
            />
            <Typography variant="h6" sx={{ fontSize: 12 }}>
              SeatNo
            </Typography>
            <SeatList
              currentUser={row}
              date={day.valueOf()}
              isAdmin={isAdmin}
              onChange={async (seat) => {
                await toggleSeat({ date: day.valueOf(), user: row._id, seat });
                modalRef.current?.close();
              }}
            />
          </Stack>
        );
      },
    });
  };

  const columns: ColumnsType<RowItem> = [
    {
      key: 'nickname',
      fixed: 'left',
      width: 128,
      filters: [
        {
          text: 'WMP',
          value: 'WMP',
        },
        {
          text: 'Apps',
          value: 'Apps',
        },
        {
          text: 'DS',
          value: 'DS',
        },
        {
          text: 'Me',
          value: 'Me',
        },
        {
          text: 'more',
          value: 'more',
          children: rows.map((i) => {
            return {
              text: i?.nickname,
              value: i?._id,
            };
          }),
        },
      ],
      showSorterTooltip: false,
      onFilter: (
        value: string | number | boolean,
        record: UserFieldsFragment,
      ): boolean => {
        if (value === 'WMP') return !!record?.tags?.includes(value as string);
        if (value === 'DS') return !!record?.tags?.includes(value as string);
        if (value === 'Apps') return !!record?.tags?.includes(value as string);
        if (value === 'Me')
          return record?._id === userInfoRes.data?.findUserInfo?._id;
        return record?._id === value;
      },
      sorter: (a, b): number =>
        a.tags?.join(',').localeCompare(b.tags?.join(',') || '') as number,
      // sortOrder: 'ascend',
      // eslint-disable-next-line react/no-unstable-nested-components
      title: () => {
        return (
          <Stack sx={{ p: 1 }}>
            <Typography
              sx={{
                fontSize: 20,
                fontweight: 'bold',
              }}
            >
              {dayjs(startDate).format('MMM')}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontStyle: 'italic',
              }}
            >
              {dayjs(startDate).format('YYYY')}
            </Typography>
          </Stack>
        );
      },
      render: (_, row: UserFieldsFragment) => {
        return (
          <Stack direction="row" spacing={1} sx={{ px: 1 }}>
            <Avatar
              size={24}
              sx={{ width: '20px', height: '20px' }}
              src={row?.avatarUrl as string}
            />

            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
              }}
            >
              {row?.nickname}
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
    },
    {
      key: 'alDays',
      title: 'AL',
      dataIndex: 'alDays',
      width: 64,
      align: 'center',
      showSorterTooltip: false,

      sorter: (a, b) => a.alDays - b.alDays,
    },
    ...days.map((day) => {
      const key = day.format('D');

      const holiday = Object.keys(holidays).find((key) => {
        const v = holidays[key];
        return day.isBetween(dayjs(v[0]), dayjs(v[1]), 'day', '[]');
      });

      return {
        key,
        // eslint-disable-next-line react/no-unstable-nested-components
        title: () => {
          return (
            <Box
              sx={{
                position: 'relative',
                height: '100%',
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontStyle: 'italic',
                }}
              >
                {day.format('ddd')}
              </Typography>

              <Typography
                sx={{
                  fontSize: 20,
                  fontweight: 'bold',
                }}
              >
                {day.format('DD')}
              </Typography>
            </Box>
          );
        },
        dataIndex: key,
        width: 64,
        align: 'center' as any,
        showSorterTooltip: false,

        sorter: (a: RowItem, b: RowItem) => {
          let atext = a[key].seat?.id || a[key].status || '0';
          if (atext === 'Office') atext = '0';
          let btext = b[key].sebt?.id || b[key].status || '0';
          if (btext === 'Office') btext = '0';
          return atext.localeCompare(btext);
        },
        sortDirections: ['descend'] as any,
        render: (info: Info, row: RowItem) => {
          let text = info.seat?.id || info.status;
          if (text === 'Office') text = '';

          let onClick;
          if (isAdmin || (row.isMe && day.isAfter(dayjs(), 'day'))) {
            onClick = () => {
              handleClickCell(day, row);
            };
          }

          if (info?.comment)
            return (
              <Tooltip key={key} title={info?.comment} placement="top" arrow>
                <StyledTableCell
                  onClick={onClick}
                  status={info?.status}
                  workingDay={info?.workingDay}
                  hasSeat={!!info?.seat?.id}
                >
                  {text}
                </StyledTableCell>
              </Tooltip>
            );

          return (
            <StyledTableCell
              key={key}
              onClick={onClick}
              status={info?.status}
              workingDay={info?.workingDay}
              hasSeat={!!info?.seat?.id}
              holiday={!!holiday}
            >
              {holiday || text}
            </StyledTableCell>
          );
        },
      };
    }),
  ];

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
              // scroll={{ x: 2000, y: height }}
              pagination={false}
              scroll={scroll}
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
