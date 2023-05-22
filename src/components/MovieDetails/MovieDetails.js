import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, Suspense } from 'react';
import axios from 'axios';

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
    <div>
      <Link to={backLinkLocationRef.current}>Back</Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Vote Average: {movie.vote_average}</p>
      <ul>
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
