import React from "react";

/**
 * A Card component is used during a Study session. It shows the front side
 * and can be flipped to the back.
 * @param {ComponentProps} props - Properties passed in for the component.
 * @param {Object} props.deck - A deck object representing a stack of cards.
 * @param {number} props.cardNum - The index of the card.
 * @param {boolean} props.flipped - Whether the card is currently flipped.
 * @param {function} props.flip - Flips the card when called.
 * @param {function} props.next - Goes to the next card when called.
 * @returns {ReactElement} JSX for a Card component.
 */
export default function Flashcard({ deck, cardNumber, flipped, flip, next }) {
  return (
    <div className="card mt-2" id={`card-${deck.id}`}>
      <div className="card-body">
        <h4 className="card-title">
          Card {cardNumber + 1} of {deck.cards.length}
        </h4>
        <p className="card-text">
          {deck.cards[cardNumber][flipped ? "back" : "front"]}
        </p>
        <button type="button" className="btn btn-secondary mr-2" onClick={flip}>
          Flip
        </button>
        {flipped && (
          <button type="button" className="btn btn-primary mr-2" onClick={next}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
