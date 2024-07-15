import React, { useEffect } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import MovieFilterUI from "../components/movieFilterUI";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { getMoviesByCategory } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import { DiscoverMovies } from "../types/interfaces";

const titleFilter = (movie, filterValue) => {
    return movie.title.toLowerCase().includes(filterValue.toLowerCase());
};

const genreFilter = (movie, filterValue) => {
    return filterValue === "0" || movie.genre_ids.includes(parseInt(filterValue));
};

const MoviesCategoryPage = () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("moviesByCategory", getMoviesByCategory);
    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        { name: "title", value: "", condition: titleFilter },
        { name: "genre", value: "0", condition: genreFilter }
    ]);

    useEffect(() => {
        if (data) {
            setFilterValues(prevFilters => prevFilters.map(filter => {
                // Adjusting to match data structure if needed or reinitialize
                return { ...filter, value: data.results.find(item => filter.name === item.name)?.value || filter.value };
            }));
        }
    }, [data, setFilterValues]);

    if (isLoading) return <Spinner />;
    if (isError) return <h1>{error.message}</h1>;

    const changeFilterValues = (type, value) => {
        setFilterValues(filterValues.map(f => f.name === type ? { ...f, value } : f));
    };

    const filteredMovies = filterFunction(data ? data.results : []);

    return (
        <>
            <PageTemplate
                title="Movies by Category"
                movies={filteredMovies}
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

export default MoviesCategoryPage;
