import React, { useContext, useState } from 'react';
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from '../contexts/moviesContext';
import { Pagination, Box } from '@mui/material';
import { red, blue } from '@mui/material/colors';
import { useLanguage } from '../components/language';

const UpcomingMoviesPage = () => {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(['upcomingMovies', page, language], () => getUpcomingMovies(page, language), {
    keepPreviousData: true 
  });
  const { addToMustWatch, mustWatch } = useContext(MoviesContext);

  const handleAddToMustWatch = (movieId) => {
    addToMustWatch(movieId);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={data.results || []} 
        action={movie => (
          <PlaylistAddIcon
            style={{
              cursor: 'pointer',
              color: mustWatch.includes(movie.id) ? red[500] : blue[500],
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = mustWatch.includes(movie.id) ? red[700] : blue[700]}
            onMouseLeave={(e) => e.currentTarget.style.color = mustWatch.includes(movie.id) ? red[500] : blue[500]}
            onClick={() => handleAddToMustWatch(movie.id)}
          />
        )}
      />
      {data.total_pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination count={data.total_pages} page={page} onChange={handlePageChange} />
        </Box>
      )}
    </>
  );
};

export default UpcomingMoviesPage;
