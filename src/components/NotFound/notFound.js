import { useNavigate } from 'react-router-dom';
import css from './notFound.module.css'

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>404 - Сторінку не знайдено</h2>
      <p>Ви можете повернутись на головну сторінку</p>
      <button className={css.goBackButton} onClick={handleNavigateHome}>Перейти на головну</button>
    </div>
  );
};

export default NotFound;