import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import list from '@/pages/seatselection/components/SeatList/seatData';
import {
  useFindUserToSeatsQuery,
  UserFieldsFragment,
  useUserToSeatDeletedSubscription,
  useUserToSeatCreatedSubscription,
  useFindSeatsQuery,
} from '@/generated/graphql';
import dayjs from 'dayjs';

function isArrayContained(a = [], b = []) {
  for (let i = 0; i < b.length; i += 1) {
    if (a.indexOf(b[i]) === -1) {
      return false;
    }
  }
  return true;
}

interface Props {
  date: number;
  isAdmin?: boolean;
  currentUser: UserFieldsFragment;
  onChange: (seat: string) => void;
}

export default function SeatList(props: Props) {
  const { date, currentUser, isAdmin, onChange } = props;

  const { data, refetch } = useFindUserToSeatsQuery({
    variables: { startDate: date },
  });

  const seatsRes = useFindSeatsQuery();

  useUserToSeatDeletedSubscription({
    onSubscriptionData: () => {
      refetch();
    },
  });

  useUserToSeatCreatedSubscription({
    onSubscriptionData: () => {
      refetch();
    },
  });

  const handleClick = async (user: string, seat: string) => {
    onChange(seat);
  };

  return (
    <div>
      <Stack spacing={2}>
        {list.map((line) => {
          return (
            <Stack key={line.key}>
              {line.list.map((seats) => {
                return (
                  <Stack key={seats.key}>
                    <ButtonGroup size="small">
                      {seats.seats.map((seat) => {
                        const currentSeat = seatsRes.data?.findSeats?.find(
                          (i) => i._id === seat._id,
                        );

                        const itemUser = data?.list?.find(
                          (k) => k?.seat?._id === seat._id,
                        )?.user;

                        const currentSelect =
                          itemUser?._id === currentUser?._id;

                        let title = '';
                        let disabled = false;

                        const tagsMatched = isArrayContained(
                          currentUser?.tags as string[],
                          currentSeat?.tags as string[],
                        );

                        const timeOk = dayjs().isAfter(
                          dayjs(date)
                            .startOf('months')
                            .subtract(tagsMatched ? 10 : 5, 'day'),
                        );

                        if (!timeOk) {
                          disabled = true;
                          title = 'out of time range';
                        }

                        if (itemUser && itemUser?._id !== currentUser?._id) {
                          disabled = true;
                          title = itemUser?.nickname as string;
                        }

                        if (currentSeat?.disabled) {
                          disabled = true;
                          title = 'disabled';
                        }

                        if (isAdmin) {
                          disabled = false;
                          title = '';
                        }

                        const variant = currentSelect ? 'contained' : undefined;

                        return (
                          <Tooltip
                            placement="top"
                            title={title}
                            arrow
                            key={seat._id}
                          >
                            <div>
                              <Button
                                variant={variant}
                                disabled={disabled}
                                onClick={() => {
                                  handleClick(currentUser?._id, seat._id);
                                }}
                                sx={{ width: '60px', borderRadius: '0px' }}
                              >
                                {itemUser ? (
                                  <Avatar
                                    src={itemUser.avatarUrl as string}
                                    sx={{ height: 22, width: 22 }}
                                  />
                                ) : (
                                  seat.id
                                )}
                              </Button>
                            </div>
                          </Tooltip>
                        );
                      })}
                    </ButtonGroup>
                  </Stack>
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
}
