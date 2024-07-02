import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { red, blue } from '@mui/material/colors';

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface MovieCardProps {
  movie: BaseMovieProps;
  action?: (m: BaseMovieProps) => React.ReactNode;
  onUpcomingPage?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, action, onUpcomingPage }) => {
  const { favourites, mustWatch } = useContext(MoviesContext);
  const isFavourite = favourites.includes(movie.id);
  const isInMustWatch = mustWatch.includes(movie.id);

  const iconColor = onUpcomingPage && isInMustWatch ? red[500] : blue[500];

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite || isInMustWatch ? (
            <Avatar sx={{ backgroundColor: isFavourite ? "rgb(255, 0, 0)" : "inherit" }}>
              {action && action({
                ...movie,
                iconColor: iconColor  
              })}
            </Avatar>
          ) : null
        }
        title={<Typography variant="h5" component="p">{movie.title}</Typography>}
      />
      <CardMedia
        sx={styles.media}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
        title={movie.title}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action && action({
          ...movie,
          iconColor: iconColor  
        })}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
