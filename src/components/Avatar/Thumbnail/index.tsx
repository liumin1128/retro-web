import Avatar, { AvatarProps } from '@mui/material/Avatar';

interface Props extends AvatarProps {
  size: number;
  src: string;
}

const Thumbnail = (props: Props) => {
  const { src, size, ...other } = props;
  const thumbnail = `${src}?imageView2/0/w/${size}`;
  return <Avatar {...other} src={thumbnail} />;
};

export default Thumbnail;
