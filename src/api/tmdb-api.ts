export const getMovies = (page = 1, language = 'en-US') => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getMovie = (id, language = 'en-US') => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getGenres = (language = 'en-US') => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
  ).then( (response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getMovieImages = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    return response.json();
  }).then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getUpcomingMovies = (page = 1, language = 'en-US') => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&page=${page}`
  )
  .then(res => res.json())
  .then(json => json);
};
  
export const fetchGenres = async (language = 'en-US') => {
  const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
  );
  if (!response.ok) {
      throw new Error(`Failed to fetch genres, status: ${response.status}`);
  }
  return response.json();
};

export const fetchGenreMovies = async (genreId, language = 'en-US') => {
const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genreId}&language=${language}`
);
if (!response.ok) {
    throw new Error('Failed to fetch genre movies');
}
return response.json();
};

export const fetchPopularMovies = async (page = 1, language = 'en-US') => {
const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&page=${page}`
);
if (!response.ok) {
    throw new Error(`Failed to fetch popular movies, status: ${response.status}`);
}
return response.json();
};

export const fetchPopularActors = async (page = 1, language = 'en-US') => {
const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&page=${page}`
);
if (!response.ok) {
    throw new Error(`Failed to fetch popular actors, status: ${response.status}`);
}
return response.json();
};

export const fetchActorDetails = async (actorId, language = 'en-US') => {
const url = `https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`;
const response = await fetch(url);
if (!response.ok) {
    throw new Error('Failed to fetch actor details');
}
return response.json();
};

export const fetchActorMovies = async (actorId, language = 'en-US') => {
const response = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
);
if (!response.ok) {
    throw new Error(`Failed to fetch movies for actor, status: ${response.status}`);
}
return response.json();
};

export const fetchTVSeries = async (page = 1, language = 'en-US') => {
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch TV series');
  }
  return response.json();
};

export const getMovieCredits = async (id, language = 'en-US') => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movie credits');
  }
  return response.json();
};

export const fetchCompanyDetails = async (companyId, language = 'en-US') => {
  const response = await fetch(`https://api.themoviedb.org/3/company/${companyId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getMoviesByCountry = async (countryCode, language = 'en-US') => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_origin_country=${countryCode}&language=${language}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movies from country');
  }
  return response.json();
};

export const fetchSeriesDetails = async (id, language = 'en-US') => {
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch TV series details');
  }
  return response.json();
};

export const searchMovies = async ({
  query,
  language = 'en-US',
  page = 1,
  includeAdult = false,
  primaryReleaseYear,
  region,
  year
}) => {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}&include_adult=${includeAdult}`;

  if (primaryReleaseYear) url += `&primary_release_year=${primaryReleaseYear}`;
  if (region) url += `&region=${region}`;
  if (year) url += `&year=${year}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch search results, status: ${response.status}`);
  }
  return response.json();
};
