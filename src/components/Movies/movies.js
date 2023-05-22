import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const searchQuery = searchParams.get('movieId') || '';

  useEffect(() => {
    if (!buttonClicked) {
      return;
    }
    const fetchMovies = async () => {
      const API_KEY = '80a258dcbf0a895a310fa1108346ec65';
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [buttonClicked, searchQuery]);

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Please enter a search query.');
      return;
    }
    setSearchParams({ movieId: searchQuery.trim() });
    setButtonClicked(true);
  };

  const updateQueryString = evt => {
    if (evt.target.value === '') {
      setSearchParams({});
    } else {
      setSearchParams({ movieId: evt.target.value });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Search</button>
        <div>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={searchQuery}
            onChange={updateQueryString}
          />
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;
