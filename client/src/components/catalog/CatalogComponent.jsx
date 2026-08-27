import { useEffect, useState } from "react"
import { getAll } from "../../services/gameService";
import { Link } from "react-router-dom";


export default function CatalogComponent() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const controller = new AbortController()
    getAll(controller.signal)
      .then(result => {
        setGames(result)
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error(error);

        }
      });
    return () => {
      controller.abort()
    }

  }, [])
  return (
    <section id="catalog-page">
      <h1>Catalog</h1>
      <div className="catalog-container">
        {games.map(game => (
          <div className="game" key={game._id}>
            <img src={game.imageUrl} alt={game.title} />
            <div className="details-overlay">
              <p className="name">{game.title}</p>
              <p className="genre">{game.genre}</p>
              <Link to={`/details/${game._id}`}
                className="details-button">
                Details
              </Link>
            </div>
          </div>
        ))}


      </div>
      {games.length === 0 && (
        <h3 className="no-articles">No Added Games Yet</h3>
      )}

    </section>
  )
}