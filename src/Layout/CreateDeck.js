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
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={submitHandler}>
        <div class="form-group">
          <label for="exampleFormControlInput1">Name</label>
          <input
            required
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
          />
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            class="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
          ></textarea>
        </div>
        <Link to="/" type="button" class="btn btn-secondary">
          Cancel
        </Link>
        <button
          type="submit"
          class="btn btn-primary"
          style={{ marginLeft: "10px" }}
        >
          Submit
        </button>
      </form>
    </>
    //   {/*
    // <button type="button" class="btn btn-secondary btn-lg">
    //   <PlusIcon size={24} />
    //   Create Deck
    // </button> */}
  );
}
