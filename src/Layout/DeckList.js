import React, { useEffect, useState } from "react";
import { PlusIcon, TrashIcon, EyeIcon, BookIcon } from "@primer/octicons-react";
import { listDecks, deleteDeck } from "../utils/api/index.js";
import { Link } from "react-router-dom";

export default function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const screen = await listDecks();
        setDecks(screen);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  async function deleteHandler(id) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        await deleteDeck(id);
        const screen = await listDecks();
        setDecks(screen);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const ListDeck = decks.map((deck) => {
    return (
      <div>
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {deck.cards.length} cards
            </h6>
            <p className="card-text">{deck.description}</p>

            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              <EyeIcon size={24} /> View
            </Link>

            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary"
              style={{ marginLeft: "10px" }}
            >
              <BookIcon size={24} /> Study
            </Link>
            <Link
              to="/"
              className="btn btn-danger"
              style={{ float: "right" }}
              onClick={() => deleteHandler(deck.id)}
            >
              <TrashIcon size={24} />
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Link to="/decks/new" type="button" className="btn btn-secondary btn-lg">
        <PlusIcon size={24} />
        Create Deck
      </Link>
      {ListDeck}
    </>
  );
}
