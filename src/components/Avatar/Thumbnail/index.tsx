import Avatar, { AvatarProps } from '@mui/material/Avatar';

interface Props extends AvatarProps {
  size: number;
  src: string;
}

const Thumbnail = (props: Props) => {
  const { src, size, sx, ...other } = props;
  const thumbnail = `${src}?imageView2/0/w/${size}`;
  return (
    <Avatar
      {...other}
      src={thumbnail}
      sx={{ ...sx, width: size, height: size }}
    />
  );
};

export default Thumbnail;
