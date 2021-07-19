import React, { useState } from "react";
import Square from "./Square";
import calculateWinner from "../calculateWinner.js";

const Board = () => {
	const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
	const [XisNext, setNextX] = useState(true);
	const [startNewGame, setNewGame] = useState(false);

	function handleClick(index) {
		if (calculateWinner(boardSquares)) {
			return;
		}
		// делаем копию доски, которую потом присваиваем состоянию
		const squares = [...boardSquares];
		// не дает перезаписать заполненный квадрат
		if (squares[index]) {
			return;
		}
		squares[index] = XisNext ? "X" : "O";
		setBoardSquares(squares);
		setNextX(!XisNext);
		//		console.log(squares);
		//		console.log(calculateWinner(squares));
		if (calculateWinner(squares)) {
			//	alert("winner: " + calculateWinner(squares));
			setNewGame(true);
			console.log(startNewGame);
			return calculateWinner(squares);
		}
	}

	function startAgain() {
		setBoardSquares(Array(9).fill(null));
	}

	const winner = calculateWinner(boardSquares);
	let status = "";

	if (winner) {
		status = "Winner is: " + calculateWinner(boardSquares);
	} else {
		status = "Next player: " + (XisNext ? "X" : "O");
	}

	return (
		<>
			<div className='board'>
				{boardSquares.map((element, index) => (
					<Square
						key={index}
						value={element}
						onClick={() => handleClick(index)}
					/>
				))}
			</div>
			{status}
			{startNewGame ? (
				<button className='reset' onClick={startAgain}>
					Start again
				</button>
			) : (
				""
			)}
		</>
	);
};

export default Board;
