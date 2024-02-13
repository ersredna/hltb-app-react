import './SearchPage.css'

export default function SearchPage({ games, getGame }) {

    function runGetGame(e) {
        getGame(e.target.id)
    }

    return (
        <div>
            
            {games.map(game => {
                return (
                    <div className="game-div" key={game.id}>
                        <a className="game-item" id={game.id} href="#" onClick={runGetGame}>{game.name}</a>
                        <img className="game-item game-img" src={game.imageUrl} />
                    </div>
                )
            })}
            
        </div>
    )
}