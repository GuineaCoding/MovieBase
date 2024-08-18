import React, { useState } from 'react';
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import { getUpcomingMovies } from "../api/tmdb-api";
import { Pagination, Box } from '@mui/material';
import { useLanguage } from '../components/language';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';

const UpcomingMoviesPage = () => {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(['upcomingMovies', page, language], () => getUpcomingMovies(page, language), {
    keepPreviousData: true 
  });

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
        action={(movie) => (
          <AddToFavouritesIcon
            movie_id={movie.id}
            image_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
            title={movie.title}
            overview={movie.overview}
            popularity={movie.popularity}
            release_date={movie.release_date}
            vote_count={movie.vote_count}
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
