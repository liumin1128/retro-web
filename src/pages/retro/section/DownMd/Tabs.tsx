import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { colors, TYPES, TabLabels } from '../constants';

interface Props {
  type: string;
  onClick: (type: string) => void;
}

const CustomTabs = (props: Props) => {
  const { type, onClick } = props;
  return (
    <Tabs
      value={type}
      onChange={(e, v) => {
        onClick(v);
      }}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
      sx={{
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          height: 4,
        },
        '& .MuiTabs-indicatorSpan': {
          width: '100%',
          height: 4,
          backgroundColor: '#fff',
        },
      }}
    >
      {TYPES.map((i) => {
        const label = TabLabels[i];
        const color = colors[i];
        return (
          <Tab
            key={i}
            label={label}
            sx={{
              width: '25%',
              bgcolor: `${color}.main`,
              color: '#fff !important',
            }}
            value={i}
          />
        );
      })}
    </Tabs>
  );
};

export default CustomTabs;
