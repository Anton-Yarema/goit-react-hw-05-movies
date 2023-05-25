import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader/';
import MoviesList from 'components/MoviesList/MoviesList';
import { getSearchMovies } from '../../services/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchMovies(searchQuery);
  }, [searchQuery]);

  const fetchMovies = async searchQuery => {
    try {
      setLoading(true);
      const response = await getSearchMovies(searchQuery);
      setMovies(response);
    } catch (error) {
      console.log(error);
      setError('Something went wrong. Try later...');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      alert('Please enter a search query.');
      return;
    }
    setSearchParams({ query: value.trim() });
    console.log({ query: value.trim() });
  };

  const updateQueryString = evt => {
    setValue(evt.target.value);
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
            name={value}
            onChange={updateQueryString}
          />
        </div>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {loading && <Loader />}
          {movies && <MoviesList movies={movies} />}
          {error && <p>Something went wrong. Try later</p>}
        </div>
      )}
    </div>
  );
};

export default Movies;
