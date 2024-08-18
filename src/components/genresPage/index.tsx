import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

interface GenreItemProps {
    genre: {
        id: number;
        name: string;
    };
}

const GenreItem: React.FC<GenreItemProps> = ({ genre }) => {
    return (
        <li style={{
            listStyle: 'none', 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '10px' 
        }}>
            <Button variant="contained" style={{
                backgroundColor: 'green', 
                width: '220px', 
                height: '100px', 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center', 
                textDecoration: 'none', 
                color: 'white' 
            }}>
                <Link to={`/genres/${genre.id}`} style={{
                    textDecoration: 'none', 
                    color: 'inherit', 
                    width: '100%',
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    {genre.name}
                </Link>
            </Button>
        </li>
    );
};

export default GenreItem;
