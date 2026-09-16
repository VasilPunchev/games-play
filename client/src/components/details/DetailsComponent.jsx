import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getOne, deleteGame } from "../../services/gameService"
import { getComments, addComment } from "../../services/commentService"
import useAuth from "../../hooks/useAuth"
import useForm from "../../hooks/useForm"


export default function DetailsComponent() {
  const [game, setGame] = useState({})
  const { gameId } = useParams()
  const [comments, setComments] = useState([])

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

const { values, register, setValues } = useForm({
  comment:''
})
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

  }, [gameId])

  const navigate = useNavigate()
  const { user } = useAuth()
  const isOwner = user?._id === game._ownerId

  async function deleteHandler() {
    const confirmed = window.confirm('Are you sure you want to delete this game?')
    if (!confirmed) {
      return
    }
    const token = user?.accessToken
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
    if (!values.comment) {
      window.alert('Comment is required')
      return
    }
    const token = user?.accessToken
    if (!token) {
      window.alert('You must be logged in')
      return
    }
    try {
      await addComment(gameId, values.comment, token, user.email)
      setValues({comment: ''})
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
        {isOwner && (<div className="buttons">
          <Link to={`/games/${gameId}/edit`} className="button">
            Edit
          </Link>
          <button className="button" onClick={deleteHandler}>
            Delete
          </button>
        </div>)}

        <div className="details-comments">
          <h2>Comments:</h2>
          {comments.length > 0 ? (
            <ul>
              {comments.map(comment => (
                <li className="comment" key={comment._id}>
                  <p>{comment.email}: {comment.comment}</p>
                </li>
              ))}
            </ul>
          ) : (<p className="no-comment">No comments.</p>
          )}
        </div>
      </div>
      {user && !isOwner && (<article className="create-comment">
        <label>Add new comment:</label>
        <form className="form" onSubmit={submitHandler}>
          <textarea
           
            placeholder="Comment......"
           {...register('comment')}
          />
          <input className="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>) }
    </section>
  )
}