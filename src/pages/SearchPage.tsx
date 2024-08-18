import { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Box, Typography } from '@mui/material';
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';
import { searchMovies } from '../api/tmdb-api';
import { useLanguage } from '../components/language';

const SearchMoviesPage = () => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useState({
    query: '',
    year: '',
    primaryReleaseYear: '',
    region: '',
    includeAdult: false
  });

  const { data, error, isLoading } = useQuery(['searchMovies', searchParams], () => searchMovies(searchParams), {
    enabled: !!searchParams.query
  });

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Search Movies</Typography>
      <SearchForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleSearch={handleSearch}
      />
      {isLoading && <Spinner />}
      {error && <Typography color="error">{error.message}</Typography>}
      {data && (
        <SearchResults
          movies={data.results}
          page={data.page}
          total_pages={data.total_pages}
          onPageChange={(event, value) => setSearchParams({ ...searchParams, page: value })}
        />
      )}
    </Box>
  );
};

export default SearchMoviesPage;
