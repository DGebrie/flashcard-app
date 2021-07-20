import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api/index.js";
import { Link, useParams } from "react-router-dom";

export default function AddCard() {
  const [deck, setDeck] = useState();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(deckId, abortController);
    return () => abortController.abort();
  }, [deckId]);

  async function getDeck(deckId, abortController) {
    try {
      const screen = await readDeck(deckId, abortController.signal);
      setDeck(screen);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("front"));
    const card = {
      front: formData.get("front"),

      back: formData.get("back"),
    };
    try {
      await createCard(deckId, card);
      alert("Success");
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }

  return (
    <div>
      {deck && (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Add Card
              </li>
            </ol>
          </nav>
          <h2>{deck.name}: Add Card</h2>
          <form onSubmit={submitHandler}>
            <div class="form-group">
              <label htmlFor="front">Front</label>
              <textarea
                required
                type="text"
                className="form-control"
                id="front"
                name="front"
                placeholder="Front side of card"
                rows="2"
              />
            </div>

            <div class="form-group">
              <label htmlFor="back">Back</label>
              <textarea
                className="form-control"
                id="back"
                name="back"
                rows="2"
                placeholder="Back side of card"
              ></textarea>
            </div>
            <Link
              to={`/decks/${deckId}`}
              type="button"
              class="btn btn-secondary"
            >
              Done
            </Link>
            <button
              type="submit"
              class="btn btn-primary"
              style={{ marginLeft: "10px" }}
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
