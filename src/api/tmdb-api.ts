export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};
  
export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };
  export const getUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    )
    .then(res => res.json())
    .then(json => json.results);
  };
  
 export const fetchGenres = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch genres, status: ${response.status}`);
    }
    return response.json();
};

export const fetchGenreMovies = async (genreId) => {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genreId}`);
  if (!response.ok) {
      throw new Error('Failed to fetch genre movies');
  }
  return response.json();
};

export const fetchPopularMovies = async () => {
  const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  );
  if (!response.ok) {
      throw new Error(`Failed to fetch popular movies, status: ${response.status}`);
  }
  return response.json();
};

export const fetchPopularActors = async () => {
  const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  );
  if (!response.ok) {
      throw new Error(`Failed to fetch popular actors, status: ${response.status}`);
  }
  return response.json();
};

export const fetchActorDetails = async (actorId) => {
  const url = `https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`;
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('Failed to fetch actor details');
  }
  return response.json();
};

export const fetchActorMovies = async (actorId) => {
  const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );
  if (!response.ok) {
      throw new Error(`Failed to fetch movies for actor, status: ${response.status}`);
  }
  return response.json();
};


export const fetchTVSeries = async () => {
  const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  );
  if (!response.ok) {
      throw new Error(`Failed to fetch TV series, status: ${response.status}`);
  }
  return response.json();
};
