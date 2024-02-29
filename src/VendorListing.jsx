
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import './Vendorfile.css';

const vendorsData = [
  { vendorID: 1, companyName: 'Vendor 1', contactPerson: 'John Doe', email: 'john@example.com', mobileNumber: '1234567890', registrationStatus: 'KYC registered', identificationCategory: 'Category A', migrationStatus: 'Migrated' },
  { vendorID: 2, companyName: 'Vendor 2', contactPerson: 'Jane Smith', email: 'jane@example.com', mobileNumber: '9876543210', registrationStatus: 'Not KYC registered', identificationCategory: 'Category B', migrationStatus: 'Not Migrated' },
  
];

function VendorListing() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [registrationStatusFilter, setRegistrationStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [migrationStatusFilter, setMigrationStatusFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const filteredVendors = vendorsData.filter((vendor) =>
    (searchKeyword.trim() === '' ||
      Object.values(vendor).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchKeyword.toLowerCase()))
    ) &&
    (registrationStatusFilter === 'All' || vendor.registrationStatus === registrationStatusFilter) &&
    (categoryFilter === 'All' || vendor.identificationCategory === categoryFilter) &&
    (migrationStatusFilter === 'All' || vendor.migrationStatus === migrationStatusFilter)
  );

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleRegistrationStatusFilter = (event) => {
    setRegistrationStatusFilter(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleMigrationStatusFilter = (event) => {
    setMigrationStatusFilter(event.target.value);
  };

  const handleDoubleClick = () => {
    setDarkMode((prevMode) => !prevMode); // Toggle dark mode
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Select value={registrationStatusFilter} onChange={handleRegistrationStatusFilter} variant="outlined">
                  <MenuItem value="All">All Registration Status</MenuItem>
                  <MenuItem value="KYC registered">KYC registered</MenuItem>
                  <MenuItem value="Not KYC registered">Not KYC registered</MenuItem>
                </Select>
              </Grid>
              <Grid item>
                <Select value={categoryFilter} onChange={handleCategoryFilter} variant="outlined">
                  <MenuItem value="All">All Categories</MenuItem>
                  <MenuItem value="Category A">Category A</MenuItem>
                  <MenuItem value="Category B">Category B</MenuItem>
                  {/* Add more categories as needed */}
                </Select>
              </Grid>
              <Grid item>
                <Select value={migrationStatusFilter} onChange={handleMigrationStatusFilter} variant="outlined">
                  <MenuItem value="All">All Migration Status</MenuItem>
                  <MenuItem value="Migrated">Migrated</MenuItem>
                  <MenuItem value="Not Migrated">Not Migrated</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Box border={1} borderColor="divider" borderRadius={2} marginTop={2} padding={2}>
          <div style={{ marginRight: '16px', textAlign: 'right' }}>
            <TextField label="Search" variant="outlined" value={searchKeyword} onChange={handleSearch} />
          </div>

          <TableContainer component={Paper} style={{ marginTop: '16px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vendor ID</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Contact Person</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Registration Status</TableCell>
                  <TableCell>Identification Category</TableCell>
                  <TableCell>Migration Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.vendorID}>
                    <TableCell>{vendor.vendorID}</TableCell>
                    <TableCell>{vendor.companyName}</TableCell>
                    <TableCell>{vendor.contactPerson}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.mobileNumber}</TableCell>
                    <TableCell>{vendor.registrationStatus}</TableCell>
                    <TableCell>{vendor.identificationCategory}</TableCell>
                    <TableCell>{vendor.migrationStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default VendorListing;
