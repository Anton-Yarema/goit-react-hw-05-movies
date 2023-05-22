import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const API_KEY = '80a258dcbf0a895a310fa1108346ec65';
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
        setPopularMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {popularMovies.map(movie => (
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

export default Home;
