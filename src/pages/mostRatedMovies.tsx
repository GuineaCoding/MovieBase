import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useQuery } from "react-query";
import { getMostRatedMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { MovieDetailsProps } from "../types/interfaces";
import { Container, Typography, Alert, Box } from '@mui/material';

const WriteReviewPage: React.FC = () => {
    const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
        "mostRatedMovie",
        getMostRatedMovie,
        {
            retry: 2, 
            staleTime: 1000 * 60 * 5, 
        }
    );

    if (isLoading) return <Spinner />;

    if (isError) return (
        <Container>
            <Alert severity="error">
                <Typography variant="h6">Error</Typography>
                <Typography>{error.message}</Typography>
            </Alert>
        </Container>
    );

    return (
        <Container>
            {movie ? (
                <>
                    <Box my={4}>
                        <Typography variant="h4">{movie.title}</Typography>
                        <Typography variant="subtitle1">{movie.tagline}</Typography>
                    </Box>
                    <PageTemplate movie={movie}>
                        <Box my={2}>
                            <Typography variant="h5">Movie Details</Typography>
                            <Typography>Release Date: {movie.release_date}</Typography>
                            <Typography>Rating: {movie.vote_average} / 10</Typography>
                            <Typography>Overview: {movie.overview}</Typography>
                        </Box>
                        <ReviewForm {...movie} />
                    </PageTemplate>
                </>
            ) : (
                <Box my={4}>
                    <Typography variant="h6">Waiting for movie review details...</Typography>
                </Box>
            )}
        </Container>
    );
};

export default WriteReviewPage;
