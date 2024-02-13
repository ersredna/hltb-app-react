import './GamePage.css'

export default function GamePage({ gameDetails }) {
    return (
        <div>
            <h1>{gameDetails.name}</h1>
            <div className="img-div">
                <img className="detail-img" src={gameDetails.imageUrl} />
            </div>
            <div className="details-div">
                <h3>Main Story: {gameDetails.gameplayMain}hrs</h3>
                <h3>Main + Extras: {gameDetails.gameplayMainExtra}hrs</h3>
                <h3>Completionist: {gameDetails.gameplayCompletionist}hrs</h3>
                <p>{gameDetails.description}</p>
            </div>
        </div>
    )
}