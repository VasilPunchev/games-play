import { useEffect, useState } from "react"
import { getAll } from "../../services/gameService"
import { Link } from "react-router-dom"

export default function HomeComponent() {
  const [games, setGames] = useState([])
  useEffect(() => {
    const controller = new AbortController()
    getAll(controller.signal)
      .then(result => {
        setGames(result.slice(0, 3))

      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);

        }
      })
    return () => {
      controller.abort()
    }
  }, [])
  return (

    <>
      <section id="welcome-world">
        <div className="welcome-message">
          <h2>ALL new games are</h2>
          <h3>Only in </h3>
          <img id="logo-left" src="/images/logo.png" alt="logo" />
        </div>
        <div id="home-page">
          <h1>Latest Games</h1>
          <div id="latest-wrap">
            {games.map(game => (
              
                <div className="game" key={game._id}>
                  <img src={game.imageUrl} alt={game.title} />

                  <div className="details-overlay">
                    <p className="name">{game.title}</p>
                    <p className="genre">{game.genre}</p>
                    <Link to = {`/details/${game._id}`} 
                    className="details-button" 
                    >
                    Details 
                    </Link>
                  </div>
                </div>  

            ))}
          {games.length === 0 && (<p className="no-articles">No games yet</p>) }
          </div>
        </div>
      </section>
    </>

)}
