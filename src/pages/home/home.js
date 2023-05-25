import { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import MoviesList from '../../components/MoviesList/MoviesList';
import { getMovies } from '../../services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response);
      setLoading(true);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>Trending Today</h1>
        {loading && <Loader />}
        {movies && <MoviesList movies={movies} />}
        {error && <p>Something went wrong. Try later</p>}
      </div>
    </>
  );
};

export default Home;
