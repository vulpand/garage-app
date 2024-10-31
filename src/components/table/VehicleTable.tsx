import { useState, useEffect } from 'react';
import { Box, Paper, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { getAllVehicles, getVehicleDetails } from './../../api';
import { VehicleCredentials } from '../../types';
import NoDataMessage from './NoDataMessage';

const columns: readonly { id: keyof VehicleCredentials; label: string; minWidth?: number; align?: 'right' | 'center'; }[] = [
  { id: 'licensePlate', label: 'License Plate', minWidth: 170 },
  { id: 'brand', label: 'Brand', minWidth: 100 },
  { id: 'model', label: 'Model', minWidth: 100 },
  { id: 'year', label: 'Year', minWidth: 100, align: 'right' },
  { id: 'mileage', label: 'Mileage (km)', minWidth: 150, align: 'right' },
  { id: 'client', label: 'Client', minWidth: 100 },
  { id: 'details', label: 'Action', minWidth: 100, align: 'center' },
];

const VehicleTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState<VehicleCredentials[]>([]);
  const [open, setOpen] = useState(false);
  const [repairHistory, setRepairHistory] = useState<any[]>([]);
  const navigate = useNavigate();
console.log('vehicles', vehicles)
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehicleData = await getAllVehicles();
        setVehicles(vehicleData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
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
      const vehicleDetails = await getVehicleDetails(licensePlate);
      setRepairHistory(vehicleDetails.repairHistory);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
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
          label="Search by License Plate"
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
          sx={{ width: { xs: '100%', md: '30%', lg: '20%'  } }}
          onClick={handleAddVehicle}
        >
          Vehicle
        </Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer sx={{ minWidth: 650 }}>
            <Table stickyHeader aria-label="sticky table">
              {filteredVehicles.length > 0 && (
                <TableHead>
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
                </TableHead>
              )}
              <TableBody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.licensePlate}>
                        {columns.map((column) => {
                            let value;
                            if (column.id === 'client') {
                              value = row.client?.name || 'No Client';
                            } else {
                              value = row[column.id];
                            }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'details' ? (
                                <Button
                                  variant="outlined"
                                  size="small"
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
        </Box>
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
