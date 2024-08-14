import React from 'react';
import {
  TextField, Button, Box, Typography, Checkbox, FormControlLabel
} from '@mui/material';

const SearchForm = ({ searchParams, setSearchParams, handleSearch }) => {
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSearch} noValidate sx={{ mb: 2 }}>
      <TextField
        name="query"
        label="Search Query"
        fullWidth
        value={searchParams.query}
        onChange={handleChange}
        sx={{ my: 2 }}
      />
      <TextField
        name="primaryReleaseYear"
        label="Primary Release Year"
        type="number"
        fullWidth
        value={searchParams.primaryReleaseYear}
        onChange={handleChange}
        sx={{ my: 2 }}
      />
      <TextField
        name="year"
        label="Year"
        type="number"
        fullWidth
        value={searchParams.year}
        onChange={handleChange}
        sx={{ my: 2 }}
      />
      <TextField
        name="region"
        label="Region"
        fullWidth
        value={searchParams.region}
        onChange={handleChange}
        sx={{ my: 2 }}
      />
      <FormControlLabel
        control={<Checkbox checked={searchParams.includeAdult} onChange={handleChange} name="includeAdult" />}
        label="Include Adult"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
