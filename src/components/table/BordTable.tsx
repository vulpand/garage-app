import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Paper, TableSortLabel, IconButton, TextField, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import { AppointmentCredentials } from '../../types';
import { getAllAppointments } from '../../api';
import NoDataMessage from './NoDataMessage';
import { useNavigate } from 'react-router-dom';

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
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const filteredAppointments = sortedAppointments.filter((appointment) =>
    appointment.vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (field: SortField) => {
    const isSameField = sortField === field;
    setSortDirection(isSameField && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddAppointment = () => {
    navigate('/add-appointment');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          mb: 2,
        }}
      >
        <TextField
          label="Search by Vehicle"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ mb: { xs: 2, md: 0 }, width: { xs: '100%', md: '60%', lg: '40%' } }}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          sx={{ width: { xs: '100%', md: '30%', lg: '20%'  } }}
          onClick={handleAddAppointment}
        >
          Appointment
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          {filteredAppointments.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  <TableSortLabel
                    active={sortField === 'date'}
                    direction={sortField === 'date' ? sortDirection : 'asc'}
                    onClick={() => handleSort('date')}
                  >
                    Date & Time
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  <TableSortLabel
                    active={sortField === 'serviceType'}
                    direction={sortField === 'serviceType' ? sortDirection : 'asc'}
                    onClick={() => handleSort('serviceType')}
                  >
                    Service Type
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  <TableSortLabel
                    active={sortField === 'status'}
                    direction={sortField === 'status' ? sortDirection : 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell> {/* Action column always visible */}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <StyledTableRow key={appointment._id}>
                  <TableCell component="th" scope="row">
                    {appointment.client.name}
                  </TableCell>
                  <TableCell>{appointment.vehicle.licensePlate}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {new Date(appointment.dateTime).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {appointment.serviceType}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
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