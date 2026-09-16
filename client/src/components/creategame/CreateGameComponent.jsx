import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { addGame } from "../../services/gameService"
import { useNavigate } from "react-router-dom";

export default function CreateGameComponent () {
const {values, register} = useForm({
  gameName: '',
  genre: '',
  activePlayers: '',
  releaseDate: '',
  imgUrl: '',
  summary: ''
})
const {user} = useAuth()
const navigate = useNavigate()

async function submitHandler(e) {
  e.preventDefault();
  if (!values.gameName ||
      !values.genre ||
      !values.activePlayers ||
      !values.releaseDate ||
      !values.imgUrl ||
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
     title:values.gameName,
     genre:values.genre,
     players:Number(values.activePlayers),
     date:values.releaseDate,
     imageUrl:values.imgUrl,
     summary:values.summary
  }
  try {
    await addGame(gameData, token)
    navigate('/')
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
         {...register('gameName')}
          placeholder="Enter game title..."
        />
      </div>
      <div className="form-group-half">
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
         {...register('genre')}
          placeholder="Enter game genre..."
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
        <input type="date"
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
          {...register('imgUrl')}
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
      <input className="btn submit" type="submit" value="ADD GAME" />
    </div>
  </form>
</section>
    )
}