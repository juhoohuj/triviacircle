import React, { useState, useEffect } from "react";
import Playerlist from "./Playerlist";
import questions from "../../content/questions";
import { ButtonGroup, Button } from '@mui/material';
import Dialog from "@mui/material/Dialog";

const Gametable = () => {
	const [players, setPlayers] = useState([
		{ name: 'Player 1', active: true, roundScore: 0, answerQue: 1, answeredWrong: false },
		{ name: 'Player 2', active: false, roundScore: 0, answerQue: 2, answeredWrong: false },
		{ name: 'Player 3', active: false, roundScore: 0, answerQue: 3, answeredWrong: false },
		{ name: 'Player 4', active: false, roundScore: 0, answerQue: 4, answeredWrong: false },
	]);
	const [question, setQuestion] = useState(questions[0].question);
	const [correct, setCorrect] = useState(questions[0].correct);
	const [incorrect, setIncorrect] = useState(questions[0].incorrect);
	const [disabledButtons, setDisabledButtons] = useState([]); // Track disabled buttons
	const [shuffledAnswers, setShuffledAnswers] = useState([]); // Track shuffled answers

	const [pastQuestions, setPastQuestions] = useState([]); // Track past questions

	// dialogscreen to confirm the answer
	
	const DialogScreen = () => {
		const [open, setOpen] = React.useState(false);
		const handleClickOpen = () => {
			setOpen(true);
		};
		const handleClose = () => {
			setOpen(false);
		};
		return (
			<div>
				<Button variant="contained" color="primary" onClick={handleClickOpen}>
					Open dialog
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<p>Are you sure you want to submit this answer?</p>
					<Button onClick={handleClose}>No</Button>
					<Button onClick={handleClose}>Yes</Button>
				</Dialog>
			</div>
		);
	}


	const addPlayer = (player) => {
		setPlayers([...players, player]);
	};

	useEffect(() => {
		// Shuffle answers only once when the component mounts
		const answers = shuffleAnswers(correct, incorrect);
		setShuffledAnswers(answers);
	}, []); // Empty dependency array ensures the effect runs only once

	function checkAnswer(answer, index) {
		let player = players.find((player) => player.active);
		console.log("Player: ", player);
		if (player && !disabledButtons.includes(index)) {
			// Check if button is not disabled
			if (correct.includes(answer)) {
				console.log("Correct answer");
				player.roundScore = player.roundScore + 1;
			} else {
				console.log("Wrong answer");
				player.roundScore = 0;
				player.answerQue = null;
				player.answeredWrong = true;
			}
			setDisabledButtons([...disabledButtons, index]); // Disable the button
			changeQue();
		}
	}

	function changeQue() {
		setPlayers((prevPlayers) => {
			let nextPlayers = prevPlayers.map((player) => {
				if (player.answeredWrong) {
					return { ...player, active: false, answerQue: null };
				}
				return { ...player, answerQue: player.answerQue - 1 };
			});

			let activePlayerFound = false;

			nextPlayers = nextPlayers.map((player, index) => {
				if (!player.answeredWrong && player.answerQue === 1 && !activePlayerFound) {
					activePlayerFound = true;
					return { ...player, active: true, answerQue: nextPlayers.length };
				} else if (player.answerQue < 1) {
					return { ...player, answerQue: nextPlayers.length, active: false };
				}
				return { ...player, active: false };
			});

			if (!activePlayerFound) {
				const firstActiveIndex = nextPlayers.findIndex((player) => !player.answeredWrong);
				if (firstActiveIndex !== -1) {
					nextPlayers[firstActiveIndex].active = true;
					nextPlayers[firstActiveIndex].answerQue = nextPlayers.length;
				}
			}

			return nextPlayers;
		});
	}

	//check if all players have answered wrong
	const allPlayersAnsweredWrong = players.every((player) => player.answeredWrong);

	if (allPlayersAnsweredWrong) {
		nextQuestion();
	}


	// Function to get the next question

	const nextQuestion = () => {
		const nextQuestionIndex = Math.floor(Math.random() * questions.length);
		setQuestion(questions[nextQuestionIndex].question);
		setCorrect(questions[nextQuestionIndex].correct);
		setIncorrect(questions[nextQuestionIndex].incorrect);
		setDisabledButtons([]);
		setShuffledAnswers(shuffleAnswers(questions[nextQuestionIndex].correct, questions[nextQuestionIndex].incorrect));
	}

	const shuffleAnswers = (correct, incorrect) => {
		let answers = correct.concat(incorrect);
		let shuffledAnswers = answers.sort(() => Math.random() - 0.5);
		return shuffledAnswers;
	};

	const activePlayers = players.filter((player) => !player.answeredWrong);
	const currentPlayer = players.find((player) => player.active);

	return (
		<div>
			<DialogScreen />
			<h1>Game Table</h1>
			<Playerlist players={players} />
			<p>Question: {question}</p>
			<p>Active Players</p>
			<ul>
				{activePlayers.map((player) => (
					<li key={player.name}>{player.name}</li>
				))}
			</ul>
			{currentPlayer ? (
				<p>Current Player: {currentPlayer.name}</p>
			) : (
				<p>No active player</p>
			)}
			<ul>
				{shuffledAnswers.map((answer, index) => (
					<ButtonGroup key={index} variant="contained" color="primary">
						<Button variant="contained" color="primary"
							disabled={disabledButtons.includes(index)}
							onClick={() => checkAnswer(answer, index)}
						>
							{answer}
						</Button>
					</ButtonGroup>
				))}
			</ul>
		</div>
	);
};

export default Gametable;
