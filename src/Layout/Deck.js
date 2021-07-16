import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  EyeIcon,
  BookIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@primer/octicons-react";
import { readDeck, deleteDeck, listCards } from "../utils/api/index.js";
import { Link, useParams, useHistory, Switch, Route } from "react-router-dom";
import DeckList from "./DeckList.js";
import EditDeck from "./EditDeck";

export default function Deck() {
  const [deck, setDeck] = useState();
  const { deckId, cardId } = useParams();

  console.log(deckId);

  useEffect(() => {
    async function loadData() {
      try {
        const screen = await readDeck(deckId);
        setDeck(screen);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, [deckId]);

  return (
    <>
      {deck && (
        <>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {deck.name}
              </li>
            </ol>
          </nav>
          <div>
            <div class="card w-75">
              <div class="card-body">
                <h2 class="card-title">{deck.name}</h2>
                <p class="card-text">{deck.description}</p>

                <Link to={`/decks/${deckId}/edit`} class="btn btn-secondary">
                  <PencilIcon size={24} /> Edit
                </Link>
                {/* Change icon update link */}

                <Link
                  to={`/decks/${deckId}/study`}
                  class="btn btn-primary"
                  style={{ marginLeft: "10px" }}
                >
                  <BookIcon size={24} /> Study
                </Link>
                {/* Change icon update link*/}

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  class="btn btn-primary"
                  style={{ marginLeft: "10px" }}
                >
                  <PlusCircleIcon size={24} /> Add Cards
                </Link>
                {/* Change icon update link*/}

                <Link
                  to="/"
                  class="btn btn-danger"
                  style={{ float: "right" }}
                  //   onClick={() => deleteHandler(deck.card)}
                >
                  <TrashIcon size={24} />
                </Link>
              </div>
            </div>
          </div>
          <h2>Cards</h2>
          {deck.cards.length > 0 &&
            deck.cards.map((card) => (
              <div className="row">
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">{card.front}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">{card.back}</p>
                      <div className="icons" style={{ float: "right" }}>
                        <Link
                          to={`/decks/${deckId}/cards/${card.id}/edit`}
                          class="btn btn-primary"
                          style={{ size: "24px" }}
                        >
                          <PencilIcon size={24} /> Edit
                        </Link>
                        <button
                          to="#"
                          class="btn btn-danger"
                          style={{ marginLeft: "10px" }}
                        >
                          <TrashIcon size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
}
