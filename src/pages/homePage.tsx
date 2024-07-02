import React, { useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

// Define filtering functions
const titleFilter = (movie, filterValue) => {
    return movie.title.toLowerCase().includes(filterValue.toLowerCase());
};

const genreFilter = (movie, filterValue) => {
    return filterValue === "0" || movie.genre_ids.includes(parseInt(filterValue));
};

const HomePage = () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        { name: "title", value: "", condition: titleFilter },
        { name: "genre", value: "0", condition: genreFilter }
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

    const displayedMovies = filterFunction(data ? data.results : []);

    return (
        <>
            <PageTemplate
                title="Discover Movies"
                movies={displayedMovies}
                action={(movie) => <AddToFavouritesIcon {...movie} />}
            />
            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues.find(f => f.name === "title")?.value || ""}
                genreFilter={filterValues.find(f => f.name === "genre")?.value || "0"}
            />
        </>
    );
};

export default HomePage;
