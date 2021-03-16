import React from "react";
import Card from "../components/Card.jsx";

import useFetch from "../Hooks/useFetch.jsx";

function Home() {
  const [page, setPage] = React.useState(1);
  const { loading, request, data, error, dataLength } = useFetch();

  React.useEffect(() => {
    getData();
  }, []); // eslint-disable-line

  React.useEffect(() => {
    getData({
      data: data,
    });
  }, [page]); // eslint-disable-line

  function getData(reload) {
    const params = {
      page: page,
      pageSize: 30,
    };
    request("https://api.pokemontcg.io/v2/cards", params, reload);
  }

  return (
    <div className="home">
      {error && <p>{error}</p>}

      <div className="cards-grid">
        {loading && !data && <p>Carregando...</p>}

        {!loading &&
          data &&
          data.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
      </div>

      <div className="load-more">
        {data && data.length < dataLength && (
          <button onClick={() => setPage((page) => page + 1)}>
            Loading More
          </button>
        )}
        <div>{data && data.length + " de " + dataLength}</div>
      </div>
    </div>
  );
}

export default Home;
