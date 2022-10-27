import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
// import { PlusIcon, TrashIcon, EyeIcon, BookIcon } from "@primer/octicons-react";
// import { listDecks, deleteDeck } from "../utils/api/index.js";

import { Link } from "react-router-dom";
import { HomeFillIcon } from "@primer/octicons-react";
import DeckList from "./DeckList";
import { updateDeck, readDeck } from "../utils/api/index.js";

export default function EditDeck() {
  const [deck, setDeck] = useState();
  const { deckId } = useParams();
  const history = useHistory();

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
  async function updatedDeck(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("name"));
    const deck = {
      id: deckId,
      name: formData.get("name"),

      description: formData.get("description"),
    };
    try {
      await updateDeck(deck);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {deck && (
        //   Breadcrumb - displaying path to this page
        <div>
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <HomeFillIcon size={16} />
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Edit Deck
                </li>
              </ol>
            </nav>
          </div>

          <h1>Edit Deck</h1>
          <form onSubmit={updatedDeck}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                defaultValue={deck.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                rows="3"
                defaultValue={deck.description}
              ></textarea>
            </div>
            <Link
              to={`/decks/${deckId}`}
              type="button"
              className="btn btn-secondary"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginLeft: "10px" }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
