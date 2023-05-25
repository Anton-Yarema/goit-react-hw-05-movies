import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>404 - Сторінку не знайдено</h2>
      <p>Перейти на сторінку Home.</p>
      <button onClick={handleNavigateHome}>Перейти на головну</button>
    </div>
  );
};
