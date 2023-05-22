import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, Suspense } from 'react';
import axios from 'axios';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  const location = useLocation();

  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const API_KEY = '80a258dcbf0a895a310fa1108346ec65';
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
     <div className={css.movieDetails}>
      <Link to={backLinkLocationRef.current}>Go back</Link>
      <div className={css.movieContent}>
        <img
          className={css.imageCard}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={css.movieDescription}>
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
          <p>User Score: {movie.vote_average}</p>
          <b>Overview</b>
          <p>{movie.overview}</p>
          <b>Genres</b>
          <p>
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>
          
        </div>
      </div>
      <b>Additional information</b>
      <ul className={css.subpagesList}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};


export default MovieDetails;
