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
    <>
      {deck && (
        //   Breadcrumb - displaying path to this page
        <>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">
                  <HomeFillIcon size={16} />
                  Home
                </Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <Link to={`/decks/${deckID}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Deck
              </li>
            </ol>
          </nav>

          <h1>Edit Deck</h1>
        </>
        //Form that includes a title Cards then the name (with placeholder of deck name)
        // and a Desciption with placeholder of deck description
      )}
    </>
  );
}
