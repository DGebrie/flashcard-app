import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import { HomeFillIcon } from "@primer/octicons-react";
import Flashcard from "./Flashcard";

export default function StudyDeck() {
  const [cardNumber, setCardNumber] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    return () => abortController.abort();
  }, [deckId]);

  async function getDeck(deckId, abortController) {
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (error) {
      console.log(error);
    }
  }

  if (Object.keys(deck).length === 0) return null;

  if (!deck) return null;

  function flip() {
    setFlipped(!flipped);
  }

  function next() {
    if (cardNumber + 1 === deck.cards.length) {
      if (
        window.confirm(
          `Restart cards?\n\nClick 'cancel' to return to the home page.`
        )
      ) {
        setCardNumber(0);
      } else {
        history.push("/");
      }
    } else {
      setCardNumber(cardNumber + 1);
    }
    setFlipped(false);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <HomeFillIcon size={16} />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>

      {deck.cards.length > 2 ? (
        <Flashcard
          key={deck.cards[cardNumber].id}
          deck={deck}
          cardNumber={cardNumber}
          flipped={flipped}
          flip={flip}
          next={next}
        />
      ) : (
        <div id="card-error">
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length}
            cards in this deck.
          </p>
        </div>
      )}
    </div>
  );
}
