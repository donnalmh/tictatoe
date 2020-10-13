import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
      return (
        <button 
          className={`square ${props.value === 'X' ? "isX" : "isO"}` }
          onClick={() =>  props.onClick()}
        >
          {props.value}
        </button>
      );
}

function calculateWinner(squares){
  const winningLines = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
  ]

  let winner = null;

  winningLines.forEach( line => {
    if(squares[line[0]] === squares[line[1]] && 
      squares[line[1]] === squares[line[2]]){
        winner = squares[line[0]];
    }
  })

  return winner;

}
 
  class Board extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: null
      }
      
      this.handleClick.bind(this.handleClick);
      this.handleReset.bind(this.handleReset);
    }

    handleClick(i){
      console.log("state: ",this.state);
      if(this.state.winner === null){
        const squares = this.state.squares.slice();
        if(squares[i] === null){
          squares[i] = this.state.xIsNext ? 'X' : 'O';

          let winner = calculateWinner(squares);

          this.setState(
            {squares: squares,
              xIsNext: !this.state.xIsNext,
              winner: winner
            }
          );
        }
      }
    }

    handleReset(){
      console.log("handleReseet");
      this.setState({
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: null
      })
    }

    renderResetButton(){
      const hasWinner = this.state.winner;

      if(hasWinner){
        return (
          <button className="reset" 
          onClick={() => this.handleReset()}>
            Reset
            </button>
        )
      } else {
        return null
      }
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        xIsNext={this.state.xIsNext}
        />;
    }
  
    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      const winner = calculateWinner(this.state.squares);
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <div className="status">Winner: {winner}
          {this.renderResetButton()}</div>
        </div>
      );
    }
  }


  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  