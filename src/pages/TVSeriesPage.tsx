import React from 'react';
import { useQuery } from 'react-query';
import { Grid, Paper, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Spinner from '../components/spinner';
import { fetchTVSeries } from '../api/tmdb-api';

const TVSeriesPage = () => {
    const { data, error, isLoading, isError } = useQuery('tvSeries', fetchTVSeries);

    if (isLoading) return <Spinner />;
    if (isError) return <Typography variant="h6" color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom>Popular TV Series</Typography>
            <Grid container spacing={2}>
                {data.results.map((series) => (
                    <Grid item xs={12} sm={6} md={4} key={series.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                                alt={series.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{series.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {series.overview}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default TVSeriesPage;
