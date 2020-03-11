import * as React from "react";
import Row from "./Row";
import { buildEmptyGameBoard } from "./emptyGameBoard";

export interface BoardState {
  currentRow: number;
  forwardDirection: boolean;
  pieces: number;
  speed: number;
  speedInterval: number;
  gameOver: boolean;
  gameBoard: boolean[][];
}

const initialState = {
  currentRow: 0,
  forwardDirection: true,
  pieces: 6,
  speed: 90,
  speedInterval: 0.87,
  gameOver: false,
  gameBoard: buildEmptyGameBoard()
};

class Board extends React.Component<{}, BoardState> {
  constructor(props: any) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    this.gameLoop();
    document.addEventListener("keypress", this.onKeyPress);
  }

  onKeyPress = (e: KeyboardEvent) => {
    if (e.code !== "Space") {
      return;
    }
    this.setState({ speed: this.state.speed * this.state.speedInterval });

    const currentRowNumber = this.state.currentRow;

    if (currentRowNumber > 11) {
      return;
    }

    const nextRowNumber = currentRowNumber + 1;
    const pieces = this.state.pieces;
    let newGameBoard = this.state.gameBoard;

    if (currentRowNumber === 0) {
      this.updateBoard(newGameBoard, pieces, nextRowNumber);
      this.setState({ currentRow: nextRowNumber, gameBoard: newGameBoard });
      return;
    }

    const previousRow = this.state.gameBoard[currentRowNumber - 1];
    const currentRow = this.state.gameBoard[currentRowNumber];

    const previousFirst = this.getFirst(previousRow);
    const currentFirst = this.getFirst(currentRow);
    const previousLast = this.getLast(previousRow);
    const currentLast = this.getLast(currentRow);

    const newPieces = this.getNewPieces(
      currentFirst,
      currentLast,
      previousFirst,
      previousLast
    );

    this.updateBoard(newGameBoard, newPieces, nextRowNumber);
    this.setState({
      gameBoard: newGameBoard,
      pieces: newPieces,
      currentRow: nextRowNumber
    });
  };

  gameLoop = () => {
    this.onGameLoop();

    setTimeout(this.gameLoop, this.state.speed);
  };

  onGameLoop = () => {
    const currentRow = this.state.currentRow;

    if (currentRow > 11) {
      return;
    }

    let forwardDirection = this.state.forwardDirection;
    const gameRow = this.state.gameBoard[currentRow];
    let first = this.getFirst(gameRow);
    let last = this.getLast(gameRow);

    if (last === 11) {
      if (forwardDirection) {
        forwardDirection = false;
        this.setState({ forwardDirection: false });
      }
    } else if (first === 0) {
      if (!forwardDirection) {
        forwardDirection = true;
        this.setState({ forwardDirection: true });
      }
    }

    const newGameBoard = [...this.state.gameBoard];

    if (forwardDirection) {
      newGameBoard[currentRow][first] = false;
      newGameBoard[currentRow][last + 1] = true;
    } else {
      newGameBoard[currentRow][first - 1] = true;
      newGameBoard[currentRow][last] = false;
    }

    this.setState({ gameBoard: newGameBoard });
  };

  getFirst = (row: boolean[]) => {
    for (let i = 0; i < 12; i++) {
      if (row[i]) {
        return i;
      }
    }
    return 0;
  };

  getLast = (row: boolean[]) => {
    for (let j = 11; j >= 0; j--) {
      if (row[j]) {
        return j;
      }
    }
    return 0;
  };

  updateBoard = (board: boolean[][], pieces: number, nextRowNumber: number) => {
    if (nextRowNumber > 11) {
      return;
    }

    for (let i = 0; i < pieces; i++) {
      board[nextRowNumber][i] = true;
    }
  };

  getNewPieces = (
    currentFirst: number,
    currentLast: number,
    previousFirst: number,
    previousLast: number
  ): number => {
    const currentPieces = currentLast - currentFirst + 1;

    const leftOverhang = Math.max(0, previousFirst - currentFirst);
    const rightOverhang = Math.max(0, currentLast - previousLast);

    return Math.max(0, currentPieces - Math.abs(leftOverhang - rightOverhang));
  };

  onStartOver = () => {
    this.setState({ ...initialState, gameBoard: buildEmptyGameBoard() });
  };

  getWinText = (pieces: number): string => {
    switch (pieces) {
      case 1:
        return "Barely...";
      case 2:
        return "There's room for improvement...";
      case 3:
        return "Not too shabby!";
      case 4:
        return "You did great!";
      case 5:
        return "You are truly amazing amazing!";
      case 6:
        return "perfect game!  You have achieved stacking nirvana!";
      default:
        return "";
    }
  };

  render() {
    return (
      <div className="container board-container">
        <h1 className="py-4">Stacker</h1>
        <h3 className="pb-4">Press the space bar to stack!</h3>
        {this.state.pieces > 0 && this.state.currentRow <= 11 ? (
          <>
            <Row
              rowNumber={11}
              color="color12"
              selectedCells={this.state.gameBoard[11]}
            />
            <Row
              rowNumber={10}
              color="color11"
              selectedCells={this.state.gameBoard[10]}
            />
            <Row
              rowNumber={9}
              color="color10"
              selectedCells={this.state.gameBoard[9]}
            />
            <Row
              rowNumber={8}
              color="color9"
              selectedCells={this.state.gameBoard[8]}
            />
            <Row
              rowNumber={7}
              color="color8"
              selectedCells={this.state.gameBoard[7]}
            />
            <Row
              rowNumber={6}
              color="color7"
              selectedCells={this.state.gameBoard[6]}
            />
            <Row
              rowNumber={5}
              color="color6"
              selectedCells={this.state.gameBoard[5]}
            />
            <Row
              rowNumber={4}
              color="color5"
              selectedCells={this.state.gameBoard[4]}
            />
            <Row
              rowNumber={3}
              color="color4"
              selectedCells={this.state.gameBoard[3]}
            />
            <Row
              rowNumber={2}
              color="color3"
              selectedCells={this.state.gameBoard[2]}
            />
            <Row
              rowNumber={1}
              color="color2"
              selectedCells={this.state.gameBoard[1]}
            />
            <Row
              rowNumber={0}
              color="color1"
              selectedCells={this.state.gameBoard[0]}
            />
          </>
        ) : this.state.pieces === 0 ? (
          <>
            <h1>Game Over :(</h1>
          </>
        ) : (
          <>
            <h1>You win!</h1>
            <h2>{this.getWinText(this.state.pieces)}</h2>
            <h6 className="pb-3">{`Number of pieces left: ${this.state.pieces}`}</h6>
          </>
        )}
        <button
          className="btn btn-outline-primary my-3"
          onClick={this.onStartOver}
        >
          Start Over
        </button>
      </div>
    );
  }
}

export default Board;
