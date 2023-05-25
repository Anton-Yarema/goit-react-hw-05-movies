import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';
import styled from 'styled-components';
import Loader from 'components/Loader/loader';
import Container from 'components/Container/container';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: red;
  }
`;

const Layout = () => {
  return (
    <Container>
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
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};

export default Layout;
