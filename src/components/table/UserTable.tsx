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

function createData(
    name: string,
    email: string,
    phoneNumber: number,
    role?: string,
) {
  return {
    name,
    email,
    role,
    phoneNumber,
    vehicles: [
      {
        licensePlate: 'CJ55FOR',
        vinNumber: '11091700',
      },
      {
        licensePlate: 'CJ77FOR',
        vinNumber: '11091700',
      },
    ],
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
        {/* <TableCell align="right">{row.role}</TableCell> */}
        <TableCell align="right">{row.phoneNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Vehicles
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Plate number</TableCell>
                    <TableCell>VIN number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.vehicles.map((vehicle) => (
                    <TableRow key={vehicle.licensePlate}>
                      <TableCell component="th" scope="row">
                        {vehicle.licensePlate}
                      </TableCell>
                      <TableCell>{vehicle.vinNumber}</TableCell>
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

const rows = [
  createData('Igor Namer', '159', 24),
  createData('Make Treser', '159', 24),
  createData('Steven Loms', '159', 24),
];

const UserTable = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    navigate('/add-user');
  };

  return (
    <Box>
      <Box display='flex' gap={3} sx={{ mb: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        sx={{width: '80%'}}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAddIcon />}
        sx={{width: '20%'}}
        onClick={handleAddUser}
      >
        Add User
      </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
        {filteredRows.length > 0 && 
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>}
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <Row key={row.name} row={row} />
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

export default UserTable;
