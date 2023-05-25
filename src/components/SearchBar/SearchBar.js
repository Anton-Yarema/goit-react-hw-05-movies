import React from 'react';
import css from './SearchBar.module.css';
import { ImSearch } from 'react-icons/im';

const SearchBar = ({ handleSubmit, updateQueryString, value }) => {
  return (
    <form className={css.SearchForm} onSubmit={handleSubmit}>
      <div>
        <input
          className={css.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus           
          placeholder="Search movies"
          name={value}
          onChange={updateQueryString}
        />
      </div>
      <button className={css.SearchFormButton} type="submit">
        <ImSearch />
      </button>
    </form>
  );
};

export default SearchBar;
