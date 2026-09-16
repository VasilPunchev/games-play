import useForm from "../../hooks/useForm"
import useAuth from "../../hooks/useAuth"
import { getOne, editGame } from "../../services/gameService"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

export default function EditComponent() {
  const { values, register, setValues } = useForm({
    gameName: '',
    genre: '',
    activePlayers: '',
    releaseDate: '',
    imageUrl: '',
    summary: ''
  })
  const { user } = useAuth()
  const {gameId} = useParams()
  useEffect(() => {
    const controller = new AbortController()
    getOne(gameId, controller.signal)
      .then(game => {
        setValues({
          gameName: game.title,
          genre: game.genre,
          activePlayers: game.players,
          releaseDate: game.date,
          imageUrl: game.imageUrl,
          summary: game.summary
        })
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      })

    return () => {
      controller.abort()
    }
  }, [gameId,setValues])
  const navigate = useNavigate()
  async function submitHandler(e) {
    e.preventDefault()
    if (
      !values.gameName ||
      !values.genre ||
      !values.activePlayers ||
      !values.releaseDate ||
      !values.imageUrl ||
      !values.summary
    ) {
      window.alert('All fields are required')
      return
    }
    const token = user?.accessToken
    if (!token) {
      window.alert('You must be logged in')
      return
    }
    const gameData = {
      title: values.gameName,
      genre: values.genre,
      players: Number(values.activePlayers),
      date: values.releaseDate,
      imageUrl: values.imageUrl,
      summary: values.summary
    }
    try {
      await editGame(gameId, gameData, token)
      navigate(`/games/${gameId}`)

    } catch (err) {
      window.alert(err.message)
    }
  }


  return (
    <section id="edit-page">
      <form id="add-new-game" onSubmit={submitHandler}>
        <div className="container">
          <h1>Edit Game</h1>
          <div className="form-group-half">
            <label htmlFor="gameName">Game Name:</label>
            <input
              type="text"
              id="gameName"
              placeholder="Enter game title..."
              {...register('gameName')}
            />
          </div>
          <div className="form-group-half">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              placeholder="Enter game genre..."
              {...register('genre')}
            />
          </div>
          <div className="form-group-half">
            <label htmlFor="activePlayers">Active Players:</label>
            <input
              type="number"
              id="activePlayers"
              min={0}
              placeholder={0}
              {...register('activePlayers')}
            />
          </div>
          <div className="form-group-half">
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="date"
              id="releaseDate"
             {...register('releaseDate')}
            />
          </div>
          <div className="form-group-full">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              placeholder="Enter image URL..."
              {...register('imageUrl')}
            />
          </div>
          <div className="form-group-full">
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              rows={5}
              placeholder="Write a brief summary..."
              {...register('summary')}
            />
          </div>
          <input className="btn submit" type="submit" value="EDIT GAME" />
        </div>
      </form>
    </section>
  )
}