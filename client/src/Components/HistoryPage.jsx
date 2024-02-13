// import './HistoryPage.css'

export default function HistoryPage({ searchHistory, getGame }) {

    function runGetGame(e) {
        getGame(e.target.id)
    }

    return (
        <div>
            <h1>History</h1>
            <div>

                {searchHistory.map(game => {
                    return (
                        <div className="game-div" key={game.uuid}>
                        <a className="game-item" id={game.id} href="#" onClick={runGetGame}>{game.name}</a>
                        <img className="game-item game-img" src={game.imageUrl} />
                    </div>
                    )
                })}

            </div>
        </div>
    )
}