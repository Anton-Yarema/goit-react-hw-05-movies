import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader/';
import MoviesList from 'components/MoviesList/MoviesList';
import { getSearchMovies } from '../../services/api';
import SearchBar from 'components/SearchBar';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

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
      if (response.length === 0) {
        setError(true);
        return;
      }
      setMovies(response);
    } catch (error) {
      console.log(error);
      setError(true);
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
  };

  const updateQueryString = evt => {
    setValue(evt.target.value);
  };

  return (
    <div>
      <SearchBar
        handleSubmit={handleSubmit}
        updateQueryString={updateQueryString}
        value={value}
      />
      {error && <p>There is no movies with this request. Please, try again</p>}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {loading && <Loader />}
          {movies && <MoviesList movies={movies} />}
        </div>
      )}
    </div>
  );
};

export default Movies;
