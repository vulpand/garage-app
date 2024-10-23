import * as React from 'react';
import { Box, Paper, Button, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { getAllVehicles, getVehicleDetails } from './../../api';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';
import { VehicleCredentials } from '../../types';
import NoDataMessage from './NoDataMessage';

const columns: readonly { id: keyof VehicleCredentials; label: string; minWidth?: number; align?: 'right' | 'center'; }[] = [
  { id: 'licensePlate', label: 'License Plate', minWidth: 170 },
  { id: 'brand', label: 'Brand', minWidth: 100 },
  { id: 'model', label: 'Model', minWidth: 100 },
  { id: 'year', label: 'Year', minWidth: 100, align: 'right' },
  { id: 'mileage', label: 'Mileage (km)', minWidth: 150, align: 'right' },
  { id: 'clientId', label: 'Client', minWidth: 100 },
  {
    id: 'details',
    label: 'Action',
    minWidth: 100,
    align: 'center',
  },
];

const VehicleTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setvehicles] = useState<VehicleCredentials[]>([]);
  const [open, setOpen] = useState(false);
  const [repairHistory, setRepairHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehicleData = await getAllVehicles();
        setvehicles(vehicleData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleButtonClick = async (licensePlate: string) => {
    try {
      const carDetails = await getVehicleDetails(licensePlate);
      setRepairHistory(carDetails.repairHistory);
      setOpen(true); 
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddVehicle = () => {
    navigate('/add-vehicle');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display='flex' gap={3} sx={{ mb: 2 }}>
        <TextField
          label="Search by License Plate"
          variant="outlined"
          sx={{ width: '80%' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ width: '20%' }}
          onClick={handleAddVehicle}
        >
          Add Vehicle
        </Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
          {filteredVehicles.length > 0 && (<TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>)}
            <TableBody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.licensePlate}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'details' ? (
                              <Button
                                variant="contained"
                                color="info"
                                onClick={() => handleButtonClick(row.licensePlate)}
                              >
                                Details
                              </Button>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
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
        {filteredVehicles.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredVehicles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>

      {/* Modal for displaying repair history */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Repair History</DialogTitle>
        <DialogContent>
          {repairHistory.length > 0 ? (
            <Box>
              {repairHistory.map((repair, index) => (
                <Typography key={index}>{JSON.stringify(repair)}</Typography>
              ))}
            </Box>
          ) : (
            <Typography>No repair history available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VehicleTable;
