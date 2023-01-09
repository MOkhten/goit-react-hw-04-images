
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Seachbar.module.css';
import { FiSearch } from 'react-icons/fi';

export function SearchBar({onSubmit}) {
  const [search, setSearch] = useState('');
 const inputChange = e => setSearch(e.currentTarget.value);
  
 const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search.toLowerCase());
    setSearch({ search: '' });
  };

  return (

    <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <span ><FiSearch/></span>
           </button>

           <input className={css.searchForm_input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={inputChange}
            value={search}
          />
        </form>
          
      </header>
  )
}


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};