import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import MusicNoteIcon from '@mui/icons-material/Link';
import Typography from '@mui/material/Typography';

interface Link {
  url?: string;
  icon?: string;
  title?: string;
  description?: string;
}

export default (props: Link) => {
  const { url = '', icon, description, title } = props;
  return (
    <div>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
          borderRadius: 0.5,
          mb: 1,
        }}
        onClick={(e) => {
          e.stopPropagation();
          window.open(url, '_blank');
        }}
      >
        <Box
          sx={{
            backgroundColor: '#C4CDD5',
            minWidth: 40,
            minHeight: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mr: 1,
          }}
        >
          <Avatar
            sx={{ width: 20, height: 20 }}
            variant="square"
            src={icon}
            alt={title}
          >
            <MusicNoteIcon />
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: 40 }}>
          <Typography
            component="div"
            variant="body1"
            sx={{
              fontSize: 12,
              whiteSpace: 'nowrap' /* 文本不换行 */,
              overflow: 'hidden' /* 超出的文本隐藏 */,
              textOverflow: 'ellipsis' /* 超出的文本显示为省略号(...) */,
            }}
          >
            {title || url}
          </Typography>
          {description && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: 10,
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                // whiteSpace: 'nowrap' /* 文本不换行 */,
                // overflow: 'hidden' /* 超出的文本隐藏 */,
                // textOverflow: 'ellipsis' /* 超出的文本显示为省略号(...) */,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Card>
    </div>
  );
};
