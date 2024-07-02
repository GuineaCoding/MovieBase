import React, { useContext } from 'react';
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from '../contexts/moviesContext';
import { red, blue } from '@mui/material/colors'; 

const UpcomingMoviesPage = () => {
  const { data, isLoading, isError, error } = useQuery('upcomingMovies', getUpcomingMovies);
  const { addToMustWatch, mustWatch } = useContext(MoviesContext);  

  const handleAddToMustWatch = (movieId) => {
    addToMustWatch(movieId);  
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data || []}
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
  );
};

export default UpcomingMoviesPage;
