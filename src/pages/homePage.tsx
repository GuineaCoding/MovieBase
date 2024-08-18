import { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { MenuItem, FormControl, Select, InputLabel, Box, Pagination, Typography } from '@mui/material';
import { useLanguage } from "../components/language";

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [sortProperty, setSortProperty] = useState('');
    const { language } = useLanguage(); 

    const { data, error, isLoading, isError } = useQuery(['discover', page, language], () => getMovies(page, language), {
        keepPreviousData: true
    });

    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        { name: "title", value: "", condition: (movie, value) => !value || movie.title.toLowerCase().includes(value.toLowerCase()) },
        { name: "genre", value: "", condition: (movie, value) => !value || movie.genre_ids.includes(parseInt(value)) },
        { name: "releaseYear", value: "", condition: (movie, year) => !year || (movie.release_date && movie.release_date.startsWith(year)) },
        { name: "runtime", value: "", condition: (movie, runtime) => !runtime || (movie.runtime && movie.runtime <= parseInt(runtime)) }
    ]);

    const handleSortChange = (event) => {
        setSortProperty(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const sortedAndFilteredMovies = filterFunction(data ? data.results : []).sort((a, b) => {
        if (!sortProperty) return 0;
        if (sortProperty === 'popularity' || sortProperty === 'runtime') {
            return (b[sortProperty] || 0) - (a[sortProperty] || 0);
        } else if (sortProperty === 'release_date') {
            return new Date(b[sortProperty]) - new Date(a[sortProperty]);
        }
        return 0;
    });

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">{error.message}</Typography>;

    return (
        <>
            <Box style={{ padding: '20px', backgroundColor: 'transparent' }}>
                <FormControl fullWidth>
                    <InputLabel id="sort-label"></InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortProperty}
                        onChange={handleSortChange}
                        displayEmpty
                    >
                        <MenuItem value=""><em>Sort By</em></MenuItem>
                        <MenuItem value="popularity">Popularity</MenuItem>
                        <MenuItem value="release_date">Release Date</MenuItem>
                        <MenuItem value="runtime">Runtime</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {console.log("Sorted and filtered movies:", sortedAndFilteredMovies)}
            <PageTemplate 
                title="Discover Movies"
                movies={sortedAndFilteredMovies}
                action={(movie) => {
                    console.log("Passing movie object to AddToFavouritesIcon:", movie);
                    return                     <AddToFavouritesIcon
                    movie_id={movie.id}
                    image_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average}
                    title={movie.title}
                    overview={movie.overview}
                    popularity={movie.popularity}
                    release_date={movie.release_date}
                    vote_count={movie.vote_count}
                />;
                
                }}
            />
            {data?.total_pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <Pagination count={data.total_pages} page={page} onChange={handlePageChange} />
                </Box>
            )}
        </>
    );
    
    
};

export default HomePage;
