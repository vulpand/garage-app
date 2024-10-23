import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Navigation } from '../types';

export const NAVIGATION: Navigation = [
  { segment: 'dashboard', title: 'Bord', icon: <DashboardIcon /> },
  { segment: 'vehicles', title: 'Vehicule', icon: <DirectionsCarIcon /> },
  { segment: 'clients', title: 'Clienti', icon: <PeopleIcon /> },
  
  { kind: 'divider' },
  {
    segment: 'statement',
    title: 'Statement',
    icon: <AssessmentIcon />,
    children: [
      { segment: 'document', title: 'Document', icon: <DescriptionIcon /> },
      { segment: 'invoice', title: 'Invoice', icon: <AttachMoneyIcon /> },
    ],
  },
];
