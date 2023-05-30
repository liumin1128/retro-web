import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import list from '@/pages/seatselection/components/SeatList/seatData';

import {
  useFindUserToSeatsQuery,
  UserFieldsFragment,
  useToggleUserToSeatMutation,
  useUserToSeatDeletedSubscription,
  useUserToSeatCreatedSubscription,
} from '@/generated/graphql';

interface Props {
  date: number;
  currentUser: UserFieldsFragment;
  isAdmin: boolean;
}

export default function SeatList({ date, currentUser, isAdmin }: Props) {
  console.log('date', date.valueOf());
  // const { loading: userInfoLoading, data: userInfoData } = useUserInfo();

  const { loading, data, refetch } = useFindUserToSeatsQuery({
    variables: { startDate: date },
  });

  const [toggleUserToSeat] = useToggleUserToSeatMutation();

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

  const handleClick = async (user: string, seat: string, date: number) => {
    await toggleUserToSeat({ variables: { user, seat, date } });
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
                        const itemUser = data?.list?.find(
                          (k) => k?.seat?._id === seat._id,
                        )?.user;

                        const currentSelect =
                          itemUser?._id === currentUser?._id;

                        const hasAuth = currentSelect || isAdmin;

                        let disabled = false;
                        if (itemUser) {
                          disabled = true;
                          if (currentUser && hasAuth) {
                            disabled = false;
                          }
                        }

                        const variant = currentSelect ? 'contained' : undefined;

                        return (
                          <Button
                            key={seat._id}
                            variant={variant}
                            disabled={disabled}
                            onClick={() => {
                              handleClick(currentUser?._id, seat._id, date);
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
