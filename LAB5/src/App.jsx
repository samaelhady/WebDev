import { useState } from "react";
import "./App.css";

const starsToEmoji = (n) => "⭐".repeat(n);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addMovie = () => {``
    const name = title.trim();
    if (!name || rating === 0) return;
    setMovies([...movies, { id: Date.now(), title: name, rating, comment: comment.trim() }]);
    setTitle("");
    setRating(0);
    setComment("");
  };

  const removeMovie = (id) => setMovies(movies.filter((m) => m.id !== id));

  return (
    <main className="app">
      <h1>Movies I've Watched</h1>

      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie title"
        />

        <div className="picker" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={n <= rating ? "star on" : "star"}
              onClick={() => setRating(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a short review (optional)"
          rows={3}
        />

        <button className="add" onClick={addMovie} disabled={!title.trim() || rating === 0}>
          Add movie
        </button>
      </div>

      {movies.length === 0 && (
        <p className="empty">Your list is empty. Add the first movie you watched.</p>
      )}

      <ul className="list">
        {movies.map((m) => (
          <li key={m.id}>
            <div className="row">
              <h2>{m.title}</h2>
              <button className="remove" onClick={() => removeMovie(m.id)}>
                Remove
              </button>
            </div>
            <p className="emoji">
              {starsToEmoji(m.rating)} <span>({m.rating}/5)</span>
            </p>
            {m.comment && <p className="comment">“{m.comment}”</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}