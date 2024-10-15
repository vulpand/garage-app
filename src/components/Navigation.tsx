import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
// import LayersIcon from '@mui/icons-material/Layers';
import { Navigation } from '../types/navigation';

export const NAVIGATION: Navigation = [
  { segment: 'dashboard', title: 'Bord', icon: <DashboardIcon /> },
  { segment: 'vehicles', title: 'Vehicule', icon: <DirectionsCarIcon /> },
  { segment: 'users', title: 'Clienti', icon: <PeopleIcon /> },
  

  // { kind: 'divider' },
  // {
  //   segment: 'reports',
  //   title: 'Reports',
  //   icon: <BarChartIcon />,
  //   children: [
  //     { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
  //     { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
  //   ],
  // },
  // { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];
