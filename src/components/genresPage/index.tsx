import React from 'react';
import { Link } from 'react-router-dom';

interface GenreItemProps {
    genre: {
        id: number;
        name: string;
    };
}

const GenreItem: React.FC<GenreItemProps> = ({ genre }) => {
    return (
        <li>
            <Link to={`/genres/${genre.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                {genre.name}
            </Link>
        </li>
    );
};

export default GenreItem;
