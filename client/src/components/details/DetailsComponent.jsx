import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getOne, deleteGame } from "../../services/gameService"
import { getComments, addComment } from "../../services/commentService"


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

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    getComments(gameId, controller.signal)
    .then(result => {
      setComments(result)
    })
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error(err)
      }
    })
    return () => {
      controller.abort()
    }

  },[gameId])

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

  async function submitHandler(e) {
    e.preventDefault()
    if (!comment) {
      window.alert('Comment is required')
      return
    }
    const token = localStorage.getItem('accessToken')
    if (!token) {
      window.alert('You must be logged in')
      return
    }
    try {
      await addComment(gameId, comment, token)
      setComment('')
      const updatedComments = await getComments(gameId)
      setComments(updatedComments)
    } catch (err) {
      window.alert(err.message)
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
          {comments.length > 0 ? (
            <ul>
              {comments.map(comment => ( 
                <li className="comment" key={comment._id}> 
                <p>Content: {comment.comment}</p>
                </li>
              ))}
            </ul>
          ) : (<p className="no-comment">No comments.</p>
          )}
        </div>
      </div>
      {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
      <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form" onSubmit={submitHandler}>
          <textarea 
          name="comment"
           placeholder="Comment......" 
           value={comment}
           onChange={(e) => setComment(e.target.value) }
            />
          <input className="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>
    </section>
  )
}