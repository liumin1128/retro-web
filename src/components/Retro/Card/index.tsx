import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Card = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: '16px',
  boxShadow: '0px 8px 12px rgba(153, 155, 168, 0.15);',
}));

export default Card;
