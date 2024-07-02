import React, { useState, useEffect, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    mustWatch: number[];
    addToMustWatch: (movieId: number) => void;
    myReviews: { [key: number]: Review };
    addReview: (movie: BaseMovieProps, review: Review) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    mustWatch: [],
    addToMustWatch: () => {},
    myReviews: {},
    addReview: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>(() => {
        const stored = localStorage.getItem('mustWatch');
        return stored ? JSON.parse(stored) : [];
    });
    const [myReviews, setMyReviews] = useState<{ [key: number]: Review }>({});

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites(prev => !prev.includes(movie.id) ? [...prev, movie.id] : prev);
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites(prev => prev.filter(id => id !== movie.id));
    }, []);

    const addToMustWatch = useCallback((movieId: number) => {
        setMustWatch(prev => {
            if (!prev.includes(movieId)) {
                const updatedList = [...prev, movieId];
                localStorage.setItem('mustWatch', JSON.stringify(updatedList));
                return updatedList;
            }
            return prev;
        });
    }, []);

    const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
        setMyReviews(prev => ({ ...prev, [movie.id]: review }));
    }, []);

    useEffect(() => {
        const storedMustWatch = localStorage.getItem('mustWatch');
        if (storedMustWatch) {
            setMustWatch(JSON.parse(storedMustWatch));
        }
    }, []);

    return (
        <MoviesContext.Provider value={{
            favourites,
            addToFavourites,
            removeFromFavourites,
            mustWatch,
            addToMustWatch,
            myReviews,
            addReview
        }}>
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
