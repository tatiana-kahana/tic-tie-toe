import React from 'react';
import './App.css';
import Popup from "reactjs-popup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // for alternating X and O
      count: 0,
      countWinX: 0,
      countWinO: 0,
      countTie: 0,
      sign: '',
      open: false,
      whoWon: ''
    }
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  chooseHeandler = (e) => {
    let decision = e.target.getAttribute('data');
    this.setState({ sign: decision });
  }

  clickHeandler = event => {
    //the number of the clicked square
    let data = event.target.getAttribute('data');
    let currentSquare = this.state.squares;

    if (currentSquare[data] === null) {
      if (this.state.sign === 'X')
        currentSquare[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
      else
        currentSquare[data] = (this.state.count % 2 === 0) ? 'O' : 'X';

      this.setState({ count: this.state.count + 1 });
      this.setState({ squares: currentSquare });

    }
    else {
      alert('The field is occupied');

    }
    this.isWinner()
  }

  isWinner = () => {
    let s = '';

    if (this.state.sign === 'X')
      s = (this.state.count % 2 === 0) ? 'X' : 'O';
    else
      s = (this.state.count % 2 === 0) ? 'O' : 'X';


    for (let i = 0; i < 8; i++) {
      let line = this.winnerLine[i];
      if (this.state.squares[line[0]] === s
        && this.state.squares[line[1]] === s
        && this.state.squares[line[2]] === s) {
        //alert(s + " Win!!!");
        this.openModal(this.setState({ whoWon: s }));
        if (s === 'X') {
          this.setState({ countWinX: this.state.countWinX + 1 })
        }
        else {
          this.setState({ countWinO: this.state.countWinO + 1 })
        }
      }
    }
    if (this.state.count === 8) {
      this.setState({ countTie: this.state.countTie + 1 })
      //alert("Tie");
      this.openModal(this.setState({ whoWon: 'Tie!' }))
    }
  }
  refreshGame = () => {
    this.setState({ squares: Array(9).fill(null) });
    this.setState({ count: 0 })
  }

  render() {
    return (
      <div className='container'>

        <h1>Tic-Tie-Toe</h1>

        <div className="game-field">
          <div className="section" onClick={this.clickHeandler} data='0'>{this.state.squares[0]}</div>
          <div className="section" onClick={this.clickHeandler} data='1'>{this.state.squares[1]}</div>
          <div className="section" onClick={this.clickHeandler} data='2'>{this.state.squares[2]}</div>
          <div className="section" onClick={this.clickHeandler} data='3'>{this.state.squares[3]}</div>
          <div className="section" onClick={this.clickHeandler} data='4'>{this.state.squares[4]}</div>
          <div className="section" onClick={this.clickHeandler} data='5'>{this.state.squares[5]}</div>
          <div className="section" onClick={this.clickHeandler} data='6'>{this.state.squares[6]}</div>
          <div className="section" onClick={this.clickHeandler} data='7'>{this.state.squares[7]}</div>
          <div className="section" onClick={this.clickHeandler} data='8'>{this.state.squares[8]}</div>
        </div>

        <button className="refresh" onClick={this.refreshGame}>Refresh the game</button>
        <div className="wins">
          <h3>Wins:</h3>
          <p>X Win: {this.state.countWinX}</p>
          <p>0 Win: {this.state.countWinO}</p>
          <p>Tie: {this.state.countTie}</p>

        </div>

        <div className="choose-tie">
          <h3>Choose:</h3>

          <button onClick={this.chooseHeandler} data='X'>X</button>
          <button onClick={this.chooseHeandler} data='O'>O</button>
        </div>

        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <>
            <div className="modal">
              <span className="close" onClick={this.closeModal}>
                &times;
            </span>
              {this.state.whoWon} Wins!!!
          </div>
            <button
              className="button"
              onClick={
                this.closeModal
              }
            >
              Close
          </button>
          </>
        </Popup>

      </div >
    )
  }
}

export default App;
