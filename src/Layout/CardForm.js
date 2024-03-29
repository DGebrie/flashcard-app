import { Link, useParams } from "react-router-dom";

export default function CardForm(props) {
  const { deckId } = useParams();
  return (
    <div>
      <form onSubmit={props.submitHandler}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            required
            type="text"
            className="form-control"
            id="front"
            name="front"
            placeholder="Front side of card"
            rows="2"
            defaultValue={props.front}
          />
        </div>

        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="2"
            placeholder="Back side of card"
            defaultValue={props.back}
          ></textarea>
        </div>
        <Link
          to={`/decks/${deckId}`}
          type="button"
          className="btn btn-secondary"
        >
          Done
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "10px" }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
