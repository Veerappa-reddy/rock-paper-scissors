import './index.css'

const Navbar = props => {
  const {score} = props
  return (
    <div className="navbar-container">
      <div>
        <h1 className="type-name">
          Rock
          <br /> Paper
          <br /> Scissors
        </h1>
      </div>
      <div className="score-container">
        <p>SCORE</p>
        <p className="score">{score}</p>
      </div>
    </div>
  )
}
export default Navbar
