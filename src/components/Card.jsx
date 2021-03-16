import React from "react";
import imgCard from './../assets/card.jpg'

function Card({ card }) {
  const [load, setLoad] = React.useState(true);

  function handleClick() {
    console.log(card);
  }

  function imageLoad() {
    setLoad(false);
  }

  return (
    <div className="Card" key={card.id} title={card.name} onClick={handleClick}>
      <img
        src={!load ? card.images.small : imgCard}
        width="240"
        height="330"
        alt={card.name}
        loading="lazy"
        onLoad={imageLoad}
      />
    </div>
  );
}

export default Card;
