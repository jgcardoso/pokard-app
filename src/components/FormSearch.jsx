import React, { useRef } from 'react'
import { useNavigate } from 'react-router';

export default function FormSearch() {
  const [inputSearch, setInputSearch] = React.useState('');
  const inputRef = useRef();
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`search/${inputSearch}`);

    setInputSearch('');
  }

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputSearch}
          placeholder="Pesquisar Carta"
          ref={inputRef}
          required
          onChange={(event) => setInputSearch(event.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  )
}
