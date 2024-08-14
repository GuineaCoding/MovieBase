import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface SearchParams {
  query: string;
  genre: string;
  year: string;
  includeAdult: boolean;
}

interface SearchFormProps {
  onSearch: (searchParams: SearchParams) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    genre: '',
    year: '',
    includeAdult: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({ ...prev, includeAdult: event.target.checked }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Search Query"
        variant="outlined"
        name="query"
        value={searchParams.query}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Genre</InputLabel>
        <Select
          name="genre"
          value={searchParams.genre}
          onChange={handleInputChange as any}
        >
          {/* Populate with genres */}
          <MenuItem value={28}>Action</MenuItem>
          <MenuItem value={12}>Adventure</MenuItem>
          {/* Add other genres */}
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="Year"
        variant="outlined"
        name="year"
        value={searchParams.year}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={searchParams.includeAdult} onChange={handleCheckboxChange} />}
          label="Include Adult"
        />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary">Search</Button>
    </form>
  );
};

export default SearchForm;
