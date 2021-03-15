import React from "react";
import CardsContext from './../state/CardsContext';
import Card from './../components/Card'

import useFetch from '../Hooks/useFetch'

function Home() {
  const [page, setPage] = React.useState(1);
  const { loading, request, data, error,  dataLength } = useFetch();

  React.useEffect(() => {
    getData();
  }, []); // eslint-disable-line

  React.useEffect(() => {
    getData({
      data: data
    });
  }, [page]);

  function getData(reload) {
    const params = {
      page: page,
      pageSize: 30
    };
    request('https://api.pokemontcg.io/v2/cards', params, reload);
  }
  
  return (
    <div className="home">

      {error && <p>{error}</p>}

      <div className="cards-grid">
        {loading && !data && <p>Carregando...</p>}

        {!loading && data && data.map(card => {
          return (
            <CardsContext.Provider key={card.id} value={card}>
              <Card card={card} />
            </CardsContext.Provider>
          )
        })}
      </div>

      <div className="load-more">
        {
          data && data.length < dataLength && 
          <button onClick={() => setPage(page => page + 1)}>Loading More</button>
        }
      </div>
    </div>
  );
}

export default Home;
