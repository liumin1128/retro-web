import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@/components/Popover';
import { Seat, User } from './type';

const bgcolorMap = {
  // 0: '#eaff8f',
  // 1: '#fffb8f',
  [-1]: 'repeating-linear-gradient(45deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1) 2px,transparent 0,transparent 4px)',
};

interface Props {
  seat: Seat;
  user?: User;

  selected?: boolean;
  onClick: (_id: string) => void;
}

function SeatCom({ seat, user, selected, onClick, onCancel }: Props) {
  const handleClick = () => {
    onClick(seat._id);
  };

  const handleCancel = () => {
    onCancel(seat._id);
  };

  let disabled = false;
  if (seat.status === -1) {
    disabled = true;
  } else if (!selected && !!user) {
    disabled = true;
  }

  const renderContent = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // boxShadow: '0 0 5px rgba(0,0,0,0.1)',
          // margin: '1px',
          width: '140px',
          height: '70px',
          border: '1px #ccc solid',
          borderTop: seat.direction === 0 ? '2px #ccc solid' : '1px #ccc solid',
          borderBottom:
            seat.direction === 2 ? '2px #ccc solid' : '1px #ccc solid',
          position: 'relative',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          background: bgcolorMap[seat.status],
        }}
      >
        {seat.status !== -1 && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 4,
              padding: 4,
              // fontFamily: 'Tequila',
              // fontWeight: 700,
              fontSize: '12px',
              lineHeight: 1,
            }}
          >
            {seat.id}
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            padding: 8,
          }}
        />
        {user && <Avatar src={user.avatarUrl} />}
      </Box>
    );
  };

  if (!selected) {
    return (
      <ButtonBase disabled={disabled} onClick={handleClick}>
        {renderContent()}
      </ButtonBase>
    );
  }

  return (
    <Popover
      render={() => (
        <Box>
          <Button variant="contained" color="error" onClick={handleCancel}>
            Cancel Selection
          </Button>
        </Box>
      )}
    >
      {renderContent()}
    </Popover>
  );
}

export default SeatCom;
