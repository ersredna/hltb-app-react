import React, { setState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import SearchBar from './Components/SearchBar';
import SearchPage from './Components/SearchPage';
import GamePage from './Components/GamePage';
import HistoryPage from './Components/HistoryPage'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      games: [],
      gameDetails: {},
      searchHistory: (localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : []),
      page: 'search',
      isLoading: false
    }
  }

  loadGames = (e) => {
    e.preventDefault()

    const { query } = this.state

    this.setState({
      gameDetails: {},
      isLoading: true
    }, () => {
      fetch(`http://localhost:5000/search/${query}`)
      .then(res => res.json())
      .then(data => 
        this.setState({games: data}, () => this.setState({
          page: 'search',
          isLoading: false
        }))
      )
      .catch(err => console.error(err))
    })
  }

  getGame = (id) => {
    this.setState({
      isLoading: true
    }, () => {
      fetch(`http://localhost:5000/detail/${id}`)
      .then(res => res.json())
      .then(data => 
        this.setState({gameDetails: data}, () => {
          this.setState({
            page: 'game',
            isLoading: false
          })
          this.updateHistory(data.id, data.name, data.imageUrl)
        })
      )
      .catch(err => console.error(err))
    })
  }

  updateHistory = (id, name, imageUrl) => {
    if (this.state.searchHistory.length !== 0 ? this.state.searchHistory.toReversed()[0].id === id : false) return

    this.setState(state => ({
      searchHistory: [...state.searchHistory, {id, name, imageUrl, uuid: uuidv4()}]
    }), () => {localStorage.searchHistory = JSON.stringify(this.state.searchHistory)})
  }

  loadHistory = () => {
    this.setState({page: 'history'})
  }

  queryOnChange = (e) => {
    this.setState({query: e.target.value})
  }

  renderPage(page) {
    switch (page) {
      case 'search':
        return <SearchPage games={this.state.games} getGame={this.getGame} />
        break
      case 'game':
        return <GamePage gameDetails={this.state.gameDetails} />
        break
      case 'history':
        return <HistoryPage searchHistory={this.state.searchHistory.toReversed()} getGame={this.getGame}/>
        break
      default:
        return <SearchPage games={this.state.games} getGame={this.getGame} />
    }
  }

  render() {
    return (
      <>
        <header>
          <SearchBar query={this.state.query} queryOnChange={this.queryOnChange} loadGames={this.loadGames} loadHistory={this.loadHistory} />
        </header>
        {this.renderPage(this.state.page)}
      </>
    )
  }
}

export default App
