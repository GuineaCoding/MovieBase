import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography, Paper, CircularProgress, Box } from '@mui/material';
import { Card, CardMedia } from '@mui/material';
import { fetchCompanyDetails } from '../api/tmdb-api'


const CompanyDetailsPage = () => {
    const { companyId } = useParams();
    const { data, error, isLoading, isError } = useQuery(['companyDetails', companyId], () => fetchCompanyDetails(companyId));
  
    if (isLoading) {
      return <CircularProgress />;
    }
  
    if (isError) {
      return <Typography variant="h6" color="error">{error.message}</Typography>;
    }
  
    return (
      <Paper style={{ padding: 20, margin: '20px' }}>
        <Typography variant="h4" gutterBottom>{data.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {data.logo_path && (
            <Card sx={{ maxWidth: 100 }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/original${data.logo_path}`}
                alt={`${data.name} logo`}
              />
            </Card>
          )}
          <Typography variant="body1">{data.description || "No description available."}</Typography>
        </Box>
        <Typography variant="body2">Headquarters: {data.headquarters}</Typography>
        {data.homepage && (
          <Typography variant="body2">Homepage: 
            <a href={data.homepage} target="_blank" rel="noopener noreferrer">{data.homepage}</a>
          </Typography>
        )}
      </Paper>
    );
  };
  
  export default CompanyDetailsPage;