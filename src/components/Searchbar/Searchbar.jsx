import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      toast.warn('Please enter a valid value!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      return;
    }
    onSubmit(searchValue.toLowerCase().trim());
    setSearchValue('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span>
            <ImSearch className={css.buttonIcon} />
          </span>
        </button>

        <input
          onChange={handleChange}
          className={css.input}
          type="text"
          value={searchValue}
          autoComplete="off"
          autoFocus
          placeholder="Search"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};