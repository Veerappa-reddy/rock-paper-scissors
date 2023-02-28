import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import Navbar from '../Navbar'
import 'reactjs-popup/dist/index.css'
import './index.css'

class RockPaperScissors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typesList: props.choicesList,
      clickedTypeId: '',
      randomTypeId: '',
      isClick: false,
      resultText: '',
      score: 0,
    }
  }

  playAgain = () => {
    console.log('playagain')

    this.setState({isClick: false})
  }

  onClickType = id => {
    const {typesList, score} = this.state
    const randomIndex = Math.floor(Math.random() * typesList.length)
    console.log(randomIndex)

    const randomTypeId = typesList[randomIndex].id

    let result = ''

    if (id === 'ROCK' && randomTypeId === 'SCISSORS') {
      result = 'YOU WON'
    } else if (id === 'ROCK' && randomTypeId === 'PAPER') {
      result = 'YOU LOSE'
    } else if (id === 'SCISSORS' && randomTypeId === 'PAPER') {
      result = 'YOU WON'
    } else if (id === 'SCISSORS' && randomTypeId === 'ROCK') {
      result = 'YOU LOSE'
    } else if (id === 'PAPER' && randomTypeId === 'ROCK') {
      result = 'YOU WON'
    } else if (id === 'PAPER' && randomTypeId === 'SCISSORS') {
      result = 'YOU LOSE'
    } else if (id === randomTypeId) {
      result = 'IT IS DRAW'
    }
    let Updatedscore = 0
    if (result === 'YOU WON') Updatedscore = score + 1
    else if (result === 'YOU LOSE') Updatedscore = score - 1
    else Updatedscore = score

    this.setState({
      clickedTypeId: id,
      randomTypeId,
      isClick: true,
      resultText: result,
      score: Updatedscore,
    })
  }

  GameResultView = () => {
    const {typesList, clickedTypeId, randomTypeId, resultText} = this.state
    const choiceObject = typesList.find(each => each.id === clickedTypeId)
    const randomObject = typesList.find(each => each.id === randomTypeId)
    console.log(resultText)

    return (
      <div className="results-container">
        <div className="choice-random-container">
          <div className="choice-container">
            <h1>YOU</h1>
            <img
              src={choiceObject.imageUrl}
              alt="your choice"
              className="select-image"
            />
          </div>
          <div className="choice-container">
            <h1>OPPONENT</h1>
            <img
              src={randomObject.imageUrl}
              alt="opponent choice"
              className="select-image"
            />
          </div>
        </div>
        <div className="play-again-container">
          <p>{resultText}</p>
          <button
            type="button"
            className="play-again-btn"
            onClick={this.playAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  gameSetUp = () => {
    const {typesList} = this.state
    return (
      <div className="types-main-container">
        <div className="types-container">
          {typesList.map(eachType => (
            <button
              type="button"
              className="type-btn"
              onClick={() => this.onClickType(eachType.id)}
              data-testid={`${eachType.id.toLowerCase()}Button`}
              key={eachType.id}
            >
              <img
                src={eachType.imageUrl}
                alt="your choice"
                className="select-type-img"
                // key={eachType.id}
              />
            </button>
          ))}
        </div>
      </div>
    )
  }

  render() {
    const {isClick, resultText, score} = this.state
    console.log(resultText)

    return (
      <div className="main-container">
        <Navbar score={score} />

        {isClick ? this.GameResultView() : this.gameSetUp()}

        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              Rules
            </button>
          }
        >
          {close => (
            <>
              <div className="pop-up-container">
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  <RiCloseLine size={30} />
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                  className="rules-img"
                />
              </div>
            </>
          )}
        </Popup>
      </div>
    )
  }
}

export default RockPaperScissors
