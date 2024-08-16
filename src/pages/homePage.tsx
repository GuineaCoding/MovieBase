import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Pagination, Typography } from '@mui/material';
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
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortProperty}
                        label="Sort By"
                        onChange={handleSortChange}
                        displayEmpty
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="popularity">Popularity</MenuItem>
                        <MenuItem value="release_date">Release Date</MenuItem>
                        <MenuItem value="runtime">Runtime</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <PageTemplate
                title="Discover Movies"
                movies={sortedAndFilteredMovies}
                action={(movie) => <AddToFavouritesIcon {...movie} />}
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
