export default function SearchBar({ query, queryOnChange, loadGames, loadHistory }) {

    return (
        <nav>
            <form id="search-form" onSubmit={loadGames}>
                <input onChange={queryOnChange} value={query} />
                <button id="search-btn">Search</button>
            </form>
            <button id="history-btn" onClick={loadHistory}>History</button>
        </nav>
    )
}