import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';  
import GenreItem from '../components/genresPage/index'; 

const fetchGenres = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch genres, status: ${response.status}`);
    }
    return response.json();
};

const GenresPage = () => {
    const { data, error, isLoading, isError } = useQuery('genres', fetchGenres);

    if (isLoading) return <Spinner />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Genres</h1>
            <ul>
                {data.genres.map((genre) => (
                    <GenreItem key={genre.id} genre={genre} />
                ))}
            </ul>
        </div>
    );
};

export default GenresPage;
