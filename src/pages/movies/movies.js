import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader/';
import MoviesList from 'components/MoviesList/MoviesList';
import { getSearchMovies } from '../../services/api';
import SearchBar from 'components/SearchBar';
import NotFound from 'components/NotFound/notFound';


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
      {loading ? (
        <Loader />
      ) : (
        <div>
          {loading && <Loader />}
          {movies && <MoviesList movies={movies} />}
          {error && <NotFound />}
        </div>
      )}
    </div>
  );
};

export default Movies;
