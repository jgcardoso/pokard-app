import React from "react";
import useFetch from "../Hooks/useFetch.jsx";
import Card from "../components/Card.jsx";
import { useParams } from "react-router";

export default function Search() {
  const { loading, request, data, error } = useFetch();
  let paramsUrl = useParams();

  React.useEffect(() => {
    const params = {
      pageSize: 100,
    };
    request(
      `https://api.pokemontcg.io/v2/cards?q=name:${paramsUrl.search}*`,
      params
    );
  }, [paramsUrl]); // eslint-disable-line

  return (
    <div>
      <div className="cards-grid">
        {error && <p>{error}</p>}

        {loading && !data && <p>Carregando...</p>}

        {!loading &&
          data &&
          data.map((card) => {
            return <Card card={card} key={card.id} />;
          })}

        {!loading && data && data.length === 0 && (
          <p>Não encontramos nenhum resultado para: {paramsUrl.search}</p>
        )}
      </div>
    </div>
  );
}
