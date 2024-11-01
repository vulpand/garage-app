import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import NoDataMessage from './NoDataMessage';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllClients } from '../../api';
import { useEffect, useState } from 'react';
import { ClientCredentials } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useToast } from '../context/ToastContext';

function createData(
  name: string,
  email: string,
  phoneNumber: number,
  vehicles: { id: string; licensePlate: string }[]
) {
  return {
    name,
    email,
    phoneNumber,
    vehicles,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  const handleEmailClick = (email: string) => {
    window.open(`mailto:${email}`);
  };

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${text} copied to clipboard!`, 'info');
    });
  };

  return (
    <React.Fragment>
      <TableRow key={row.email} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleEmailClick(row.email)}>
            <MailIcon />
          </IconButton>
          {row.email}
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handlePhoneClick(row.phoneNumber.toString())}>
            <PhoneIcon />
          </IconButton>
          {row.phoneNumber}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.vehicles.length > 0 ? (<Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                License Plate Number
              </Typography>
              <Table size="small" aria-label="vehicles">
                <TableBody>
                  {row.vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell component="th" scope="row">
                        <IconButton onClick={() => handleCopyClick(vehicle.licensePlate)}>
                          <ContentCopyIcon />
                        </IconButton>
                        {vehicle.licensePlate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>) : (
              <Typography variant="body1" color="textSecondary">
                No Vehicles added
              </Typography>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ClientTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<ClientCredentials[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientData = await getAllClients();
        setClients(clientData);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    navigate('/add-client');
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
          label="Search by name"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: { xs: 2, md: 0 }, width: { xs: '100%', md: '60%', lg: '40%' } }}
        />
        <Button
          variant="contained"
          color="primary"
          size='small'
          startIcon={<AddIcon />}
          sx={{ width: { xs: '100%', md: '30%', lg: '20%' } }}
          onClick={handleAddClient}
        >
          Client
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          {filteredClients.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <Row
                  key={client.email}
                  row={createData(
                    client.name,
                    client.email,
                    client.phoneNumber,
                    client.vehicles
                  )}
                />
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

export default ClientTable;
