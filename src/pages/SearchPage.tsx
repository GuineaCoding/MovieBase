import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';  
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import { searchMovies, getGenres } from '../api/tmdb-api';

const SearchMoviesPage = () => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    year: '',
    genre: '',
    includeAdult: false
  });
  const { data: genresData } = useQuery('genres', getGenres);
  const { data, error, isLoading } = useQuery(
    ['searchMovies', searchParams],
    () => searchMovies(searchParams),
    { enabled: !!searchParams.query }
  );

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Trigger the search
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Search Movies</Typography>
      <Box component="form" onSubmit={handleSearch} noValidate>
        <TextField
          name="query"
          label="Search Query"
          fullWidth
          value={searchParams.query}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            name="genre"
            value={searchParams.genre}
            label="Genre"
            onChange={handleChange}
          >
            {genresData?.genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="year"
          label="Year"
          type="number"
          fullWidth
          value={searchParams.year}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox checked={searchParams.includeAdult} onChange={handleChange} name="includeAdult" />}
          label="Include Adult"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Search
        </Button>
      </Box>
      {isLoading && <Spinner />}
      {error && <Typography color="error">{error.message}</Typography>}
  
    </Box>
  );
};

export default SearchMoviesPage;
