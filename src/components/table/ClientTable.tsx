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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllClients } from '../../api';
import { useEffect, useState } from 'react';
import { ClientCredentials } from '../../types';

function createData(
    name: string,
    email: string,
    phoneNumber: number,
    vehicles: { id: string }[]
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
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phoneNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Vehicles
              </Typography>
              <Table size="small" aria-label="vehicles">
                <TableHead>
                  <TableRow>
                    <TableCell>Plate number</TableCell>
                    <TableCell>VIN number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell component="th" scope="row">
                        {vehicle.id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
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
      <Box display='flex' gap={3} sx={{ mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          sx={{ width: '80%' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          sx={{ width: '20%' }}
          onClick={handleAddClient}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
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
