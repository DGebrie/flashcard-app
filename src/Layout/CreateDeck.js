import React from "react";
import { createDeck } from "../utils/api/index.js";
import { Link, useHistory } from "react-router-dom";

export default function CreateDeck() {
  const history = useHistory();

  async function submitHandler(event) {
    event.preventDefault();

    const deck = {
      name: event.target.name.value,
      description: event.target.description.value,
    };

    try {
      const newDeck = await createDeck(deck);
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
          ></textarea>
        </div>
        <Link to="/" type="button" className="btn btn-secondary">
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
    </>
  );
}
