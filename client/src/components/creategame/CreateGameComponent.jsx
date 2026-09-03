import { useState } from "react"
import { addGame } from "../../services/gameService"
import { useNavigate } from "react-router-dom";

export default function CreateGameComponent () {
const [ gameName, setGameName ] = useState('');
const [ genre, setGenre ] = useState('');
const [ activePlayers, setActivePlayers ] = useState('');
const [ releaseDate, setReleaseDate ] = useState('');
const [ imgUrl, setImgUrl ] = useState('');
const [ summary, setSummary ] = useState('');
const navigate = useNavigate()

async function submitHandler(e) {
  e.preventDefault();
  if (!gameName ||
      !genre ||
      !activePlayers ||
      !releaseDate ||
      !imgUrl ||
      !summary 
    ) {
    window.alert('All fields are required')
    return
  }
  const token = localStorage.getItem('accessToken');
  if (!token) {
    window.alert('You must be logged in')
    return
  }
  const gameData = {
     title:gameName,
     genre,
     players:Number(activePlayers),
     date:releaseDate,
     imageUrl:imgUrl,
     summary
  }
  try {
    await addGame(gameData, token)
    navigate('/catalog')
  } catch (err) {
    window.alert(err.message)
  }
}

    return (
         <section id="add-page">
  <form id="add-new-game" onSubmit={submitHandler}>
    <div className="container">
      <h1>Add New Game</h1>
      <div className="form-group-half">
        <label htmlFor="gameName">Game Name:</label>
        <input
          type="text"
          id="gameName"
          name="gameName"
          value={gameName}
          onChange={(e)=> setGameName(e.target.value)}
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
          onChange={(e)=> setGenre(e.target.value)}
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
          onChange={(e)=> setActivePlayers(e.target.value)}
          min={0}
          placeholder={0}
        />
      </div>
      <div className="form-group-half">
        <label htmlFor="releaseDate">Release Date:</label>
        <input type="date"
         id="releaseDate" 
        name="releaseDate"
        value={releaseDate}
        onChange={(e)=> setReleaseDate(e.target.value)}
         />
      </div>
      <div className="form-group-full">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imgUrl}
          onChange={(e)=> setImgUrl(e.target.value)}
          name="imageUrl"
          placeholder="Enter image URL..."
        />
      </div>
      <div className="form-group-full">
        <label htmlFor="summary">Summary:</label>
        <textarea
          name="summary"
          id="summary"
          value={summary}
          onChange={(e)=> setSummary(e.target.value)}
          rows={5}
          placeholder="Write a brief summary..."
        />
      </div>
      <input className="btn submit" type="submit" value="ADD GAME" />
    </div>
  </form>
</section>
    )
}