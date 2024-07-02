import React from "react";
import { useParams, Link } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps } from "../types/interfaces";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Button from "@mui/material/Button";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    () => getMovie(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails {...movie} />
          <Button
            component={Link}
            to={'/reviews/form'}
            state={{ movieId: movie.id }}
            startIcon={<RateReviewIcon />}
            variant="contained"
            color="primary"
          >
            Add Review
          </Button>
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
