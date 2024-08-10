import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { TextField, MenuItem, FormControl, Select, InputLabel, Box } from '@mui/material';

const releaseYearFilter = (movie, year) => !year || (movie.release_date && movie.release_date.startsWith(year));
const runtimeFilter = (movie, runtime) => !runtime || (movie.runtime && movie.runtime <= parseInt(runtime));

const HomePage = () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
    const [sortProperty, setSortProperty] = useState('');

    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        { name: "title", value: "", condition: (movie, value) => !value || movie.title.toLowerCase().includes(value.toLowerCase()) },
        { name: "genre", value: "", condition: (movie, value) => !value || movie.genre_ids.includes(parseInt(value)) },
        { name: "releaseYear", value: "", condition: releaseYearFilter },
        { name: "runtime", value: "", condition: runtimeFilter }
    ]);

    useEffect(() => {
        if (data) {
            setFilterValues(prevFilters => prevFilters.map(filter => {
                const matchingData = data.results.find(item => filter.name === item.name);
                return { ...filter, value: matchingData ? matchingData.value : filter.value };
            }));
        }
    }, [data, setFilterValues]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const changeFilterValues = (type, value) => {
        const newFilters = filterValues.map(f => f.name === type ? { ...f, value } : f);
        setFilterValues(newFilters);
    };

    const handleSortChange = (event) => {
        setSortProperty(event.target.value);
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
                        <MenuItem value=""><em></em></MenuItem>
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
            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues.find(f => f.name === "title")?.value || ""}
                genreFilter={filterValues.find(f => f.name === "genre")?.value || ""}
            />
        </>
    );
};

export default HomePage;
