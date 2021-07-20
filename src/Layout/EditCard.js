import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { HomeFillIcon } from "@primer/octicons-react";
import { updateCard, readCard, readDeck } from "../utils/api/index.js";

export default function EditCard() {
  const [deck, setDeck] = useState();
  const [frontCard, setFrontCard] = useState("");
  const [backCard, setBackCard] = useState("");
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    getCard(cardId, abortController);
    return () => abortController.abort();
  }, []);

  async function getDeck(deckId, abortController) {
    try {
      let response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCard(cardId, abortController) {
    try {
      const response = await readCard(cardId, abortController.signal);
      setFrontCard(response.front);
      setBackCard(response.back);
    } catch (error) {
      console.log(error);
    }
  }

  async function updatedCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("frontCard"));
    const card = {
      deckId: Number(deckId),
      id: cardId,
      front: formData.get("frontCard"),
      back: formData.get("backCard"),
    };
    try {
      await updateCard(card);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {deck && (
        <div>
          {/* // Breadcrumb - displaying path to this page */}
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
                  <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Edit Card {cardId}
                </li>
              </ol>
            </nav>
          </div>
          <h1>Edit Card</h1>
          <form onSubmit={updatedCard}>
            <div className="form-group">
              <label htmlFor="frontCard">Front</label>
              <input
                type="text"
                name="frontCard"
                className="form-control"
                id="frontCard"
                rows="2"
                defaultValue={frontCard}
              />
            </div>
            <div className="form-group">
              <label htmlFor="back">Back</label>
              <textarea
                className="form-control"
                name="backCard"
                id="back"
                rows="2"
                defaultValue={backCard}
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
