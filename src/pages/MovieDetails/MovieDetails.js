import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, Suspense } from 'react';
import css from './MovieDetails.module.css';
import Loader from 'components/Loader';
import { getMoviesDetails } from '../../services/api';

import NoImage from '../../components/image/No_image_available.svg';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  const location = useLocation();

  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, [movieId]);

  const fetchMovieDetails = async movieId => {
    try {
      setLoading(true);
      const response = await getMoviesDetails(movieId);
      setMovie(response);
    } catch (error) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className={css.movieDetails}>
          <Link to={backLinkLocationRef.current}>Go back</Link>
          {error && <div>{error}</div>}
          {movie && (
            <div className={css.movieContent}>
              <img
                className={css.imageCard}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                    : NoImage
                }
                alt={movie.title}
              />
              <div className={css.movieDescription}>
                <h2>{movie.title}</h2>
                <p>Release Date: {movie.release_date}</p>
                <p>User Score: {movie.vote_average}</p>
                <b>Overview</b>
                <p>{movie.overview}</p>
                <b>Genres</b>
                <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
              </div>
            </div>
          )}
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
      )}
    </div>
  );
};

export default MovieDetails;
