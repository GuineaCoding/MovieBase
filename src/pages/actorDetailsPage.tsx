import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography, Paper, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';

const fetchActorDetails = async (actorId) => {
    const url = `https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch actor details');
    }
    return response.json();
};

const ActorDetailsPage = () => {
    const { id } = useParams(); 
    const { data, error, isLoading, isError } = useQuery(['actorDetails', id], () => fetchActorDetails(id));

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">Error: {error.message}</Typography>;

    return (
        <Paper style={{ padding: 20, margin: '20px' }}>
            <Typography variant="h4" gutterBottom>
                {data.name}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="450"
                            image={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                            alt={data.name}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="body1">{data.biography}</Typography>
                    <Typography variant="subtitle1" style={{ marginTop: 20 }}>
                        Born: {new Date(data.birthday).toLocaleDateString()}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ActorDetailsPage;
