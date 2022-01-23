import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Card = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

export default Card;
