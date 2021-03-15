import React from "react";
import SearchContext from "../state/SearchContext";

function Card() {
  const Search = React.useContext(SearchContext);
  const [inputSearch, setInputSearch] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();

    Search.getCards(inputSearch);

    Search.setLoading(true);
  }

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputSearch}
          placeholder="Pesquisar Carta"
          required
          onChange={(event) => setInputSearch(event.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  );
}

export default Card;
