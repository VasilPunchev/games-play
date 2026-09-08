import { useEffect, useState } from "react"
import { getOne, editGame } from "../../services/gameService"
import { useNavigate, useParams } from "react-router-dom"

export default function EditComponent() {
  const { gameId } = useParams()
  const [gameName, setGameName] = useState('')
  const [genre, setGenre] = useState('')
  const [activePlayers, setActivePlayers] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [summary, setSummary] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    getOne(gameId, controller.signal)
      .then(game => {
        setGameName(game.title)
        setActivePlayers(game.players)
        setReleaseDate(game.date)
        setImageUrl(game.imageUrl)
        setSummary(game.summary)
        setGenre(game.genre)
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
  async function submitHandler(e) {
    e.preventDefault()
    if ( 
      !gameName ||
      !genre ||
      !activePlayers ||
      !releaseDate ||
      !imageUrl ||
      !summary
    ) {
      window.alert('All fields are required')
      return
    }
    const token = localStorage.getItem('accessToken')
    if (!token) {
      window.alert('You must be logged in')
      return
    }
    const gameData = {
      title: gameName ,
      genre ,
      players: Number(activePlayers) ,
      date: releaseDate ,
      imageUrl ,
      summary
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
              name="gameName"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Enter game title..."
            />
          </div>
          <div className="form-group-half">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Enter game genre..."
            />
          </div>
          <div className="form-group-half">
            <label htmlFor="activePlayers">Active Players:</label>
            <input
              type="number"
              id="activePlayers"
              name="activePlayers"
              value={activePlayers}
              onChange={(e) => setActivePlayers(e.target.value)}
              min={0}
              placeholder={0}
            />
          </div>
          <div className="form-group-half">
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </div>
          <div className="form-group-full">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL..."
            />
          </div>
          <div className="form-group-full">
            <label htmlFor="summary">Summary:</label>
            <textarea
              name="summary"
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={5}
              placeholder="Write a brief summary..."

            />
          </div>
          <input className="btn submit" type="submit" value="EDIT GAME" />
        </div>
      </form>
    </section>
  )
}