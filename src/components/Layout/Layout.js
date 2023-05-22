import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

const Layout = () => {
  return (
    <div>
      <header>
        <ul className={css.navList}>
          <li>
            <StyledLink to="/" className={css.title}>
              Home
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/Movies">Movies</StyledLink>
          </li>
        </ul>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
