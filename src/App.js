import React from "react";
import axios from 'axios';
import "./App.css";
import CardsContext from './state/CardsContext';
import SearchContext from './state/SearchContext';
import Card from './components/Card'
import Search from './components/Search'
// import Api from './services/api'

function App() {
  const [cards, setCard] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [reload, setReload] = React.useState(true);
  const [cardsLength, setCardsLength] = React.useState(0);

  React.useEffect(() => {
    if(cards === null) return false;

    if(reload) {
      setLoading(true)
    }

    getCards();

  }, [page]); // eslint-disable-line
  
  const getCards = (search) => {
    console.log(search);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    const params = {
      page: page,
      pageSize: 30
    };

    if(search) {
      params.q = 'name:' + search + '*';
      params.pageSize = 250
    }

    axios.get(`https://api.pokemontcg.io/v2/cards`, { params, headers })
    .then(res => {

      let newCards;
      if(search) {
        newCards = res.data.data;
        setPage(1)
      } else {
        newCards = [...cards, ...res.data.data];
      }
      setCard(newCards);
      setCardsLength(res.data.totalCount);
      setLoading(false);
    })
  }
  
  function addCards (param) {
    setPage(param + 1);
    setReload(false);
  }

  return (
    <div className="App">

      <div className="app-grid">
        
        <div className="app-sidebar">
          <div className="app-sidebar__logo">
            <img src="https://jonasguedes.com/labs/pokemontcg/img/logo-pokemon.f9e19588.png" alt="Pokemon TCG"/>
          </div>

          <div className="app-sidebar__menu">
            <ul>
              <li><a href="#">Cards</a></li> {/* eslint-disable-line */}
              <li><a href="#">About</a></li> {/* eslint-disable-line */}
            </ul>
          </div>

        </div>

        <div className="app-content">

          <div className="app-content__actions">
            <div className="app-content__search">
              <SearchContext.Provider value={{getCards, setLoading}}>
                <Search></Search>
              </SearchContext.Provider>
            </div>
          </div>

          <div className="cards-grid">
            {loading && <p>Carregando...</p>}

            { !loading && cards && cards.map(card => {
              return (
                <CardsContext.Provider key={card.id} value={card}>
                  <Card card={card} />
                </CardsContext.Provider>
              )
            })  }
          </div>

          <div className="load-more">
            {
              cards.length < cardsLength && <button onClick={() => addCards(page)}>Loading More</button>
            }
          </div>

          <p>The literal and graphical information presented on this site about Pokemon, including card images and card text, Pokemon, The Pokemon TCG, and The Pokemon TCG Online and its trademarks are ©1995-2021 Nintendo, The Pokémon Company International, Inc, and GAMEFREAK. This website is not produced by, endorsed by, supported by, or affiliated with Nintendo, The Pokémon Company International, Inc, or GAMEFREAK.</p>

        </div>

      </div>

    </div>
  );
}

export default App;
