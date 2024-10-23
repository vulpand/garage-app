import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Paper, TableSortLabel, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { AppointmentCredentials } from '../../types';
import { getAllAppointments } from '../../api';
import NoDataMessage from './NoDataMessage';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'green';
    case 'Cancelled':
      return 'red';
    case 'Completed':
      return 'blue';
    default:
      return 'gray';
  }
};

type SortField = 'date' | 'serviceType' | 'status';

const BordTable = () => {
  const [appointments, setAppointments] = useState<AppointmentCredentials[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<SortField>('date');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAllAppointments();
        setAppointments(response);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const sortedAppointments = [...appointments].sort((a, b) => {
    const aValue = sortField === 'date' ? new Date(a.dateTime).getTime() : a[sortField];
    const bValue = sortField === 'date' ? new Date(b.dateTime).getTime() : b[sortField];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    const isSameField = sortField === field;
    setSortDirection(isSameField && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          {sortedAppointments.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'date'}
                    direction={sortField === 'date' ? sortDirection : 'asc'}
                    onClick={() => handleSort('date')}
                  >
                    Date & Time
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'serviceType'}
                    direction={sortField === 'serviceType' ? sortDirection : 'asc'}
                    onClick={() => handleSort('serviceType')}
                  >
                    Service Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'status'}
                    direction={sortField === 'status' ? sortDirection : 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell> {/* New Action column */}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {sortedAppointments.length > 0 ? (
              sortedAppointments.map((appointment) => (
                <StyledTableRow key={appointment._id}>
                  <TableCell component="th" scope="row">
                    {appointment.client.name}
                  </TableCell>
                  <TableCell>{appointment.vehicle.licensePlate}</TableCell>
                  <TableCell>{new Date(appointment.dateTime).toLocaleString()}</TableCell>
                  <TableCell>{appointment.serviceType}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                        backgroundColor: getStatusColor(appointment.status),
                        borderRadius: '50%',
                        marginRight: '8px',
                      }}
                    ></span>
                    {appointment.status}
                  </TableCell>
                  {/* Action Buttons: Phone, WhatsApp, Email */}
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => window.open(`tel:${appointment.client.phoneNumber}`)}
                      aria-label="call"
                      sx={{ ml: 1 }}
                    >
                      <PhoneIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => window.open(`https://wa.me/${appointment.client.phoneNumber}`)}
                      aria-label="whatsapp"
                      sx={{ ml: 1 }}
                    >
                      <WhatsAppIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => window.open(`mailto:${appointment.client.email}`)}
                      aria-label="email"
                      sx={{ ml: 1 }}
                    >
                      <EmailIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <NoDataMessage />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BordTable;