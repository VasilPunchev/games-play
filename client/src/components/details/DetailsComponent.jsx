import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getOne, deleteGame } from "../../services/gameService"


export default function DetailsComponent() {
  const [game, setGame] = useState({})
  const { gameId } = useParams()
 
  useEffect(() => {
   if (!gameId) {
    return;
   }

    const controller = new AbortController()
    getOne(gameId, controller.signal)
      .then(result => {
        setGame(result)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      })
    return () => {
      controller.abort()
    }
  }, [gameId])

  const navigate = useNavigate()
  
  async function deleteHandler() {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      console.error('No access token')
      return
    }
    try {
      await deleteGame(gameId, token)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="header-and-image">
          <img
            className="game-img"
            src={game.imageUrl}
            alt={game.title}
          />
          <div className="meta-info">
            <h1 className="game-name">{game.title}</h1>
            <p className="data-row">
              <span className="label">Genre:</span>
              <span className="value">{game.genre}</span>
            </p>
            <p className="data-row">
              <span className="label">Active Players:</span>
              <span className="value">{game.players}</span>
            </p>
            <p className="data-row">
              <span className="label">Release Date:</span>
              <span className="value">{game.date}</span>
            </p>
          </div>
          <div className="summary-section">
            <h2>Summary:</h2>
            <p className="text-summary">
              {game.summary}
            </p>
          </div>
        </div>
        {/* Edit/Delete buttons ( Only for creator of this game )  */}
        <div className="buttons">
          <Link to={`/games/${gameId}/edit`} className="button">
            Edit
          </Link>
          <button className="button" onClick={deleteHandler}>
            Delete
          </button>
        </div>
        <div className="details-comments">
          <h2>Comments:</h2>
          <ul>
            <li className="comment">
              <p>
                Content: A masterpiece of world design, though the boss fights are
                brutal.
              </p>
            </li>
            <li className="comment">
              <p>
                Content: Truly feels like a next-gen evolution of the Souls formula!
              </p>
            </li>
          </ul>
          {/* Display paragraph: If there are no games in the database */}
          {/* <p class="no-comment">No comments.</p> */}
        </div>
      </div>
      {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
      <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form">
          <textarea name="comment" placeholder="Comment......" defaultValue={""} />
          <input className="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>
    </section>
  )
}