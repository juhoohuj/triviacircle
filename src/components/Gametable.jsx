import React, { useState, useEffect } from "react";
import Playerlist from "./Playerlist";
import questions from "../../content/questions";
import { ButtonGroup } from "@mui/material";

//pelipöytä
const Gametable = () => {
  const testUser = {
    id: 1,
    name: "Test User",
    totalScore: 0,
    roundScore: 0,
    active: true,
    answerQue: 1,
  };

  const testUser2 = {
    id: 2,
    name: "Test User 2",
    totalScore: 4, // Corrected typo: 'totaolScore' -> 'totalScore'
    roundScore: 0,
    active: true,
    answerQue: 2,
  };

  const [players, setPlayers] = useState([testUser, testUser2]);
  const [question, setQuestion] = useState(questions[0].question);
  const [correct, setCorrect] = useState(questions[0].correct);
  const [incorrect, setIncorrect] = useState(questions[0].incorrect);
  const [disabledButtons, setDisabledButtons] = useState([]); // Track disabled buttons
  const [shuffledAnswers, setShuffledAnswers] = useState([]); // Track shuffled answers

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
    if (!disabledButtons.includes(index)) {
      // Check if button is not disabled
      if (correct.includes(answer)) {
        console.log("Correct answer");
        player.roundScore = player.roundScore + 1;
        console.log("Player round score: ", player.roundScore);
        console.log("Player total score: ", player.totalScore);
      } else {
        console.log("Wrong answer");
        player.roundScore = 0;
        player.answerQue = null;
        console.log("Player round score: ", player.roundScore);
        console.log("Player total score: ", player.totalScore);
      }
      setDisabledButtons([...disabledButtons, index]); // Disable the button
    }
    changeQue();
  }

  // Function to change player turn
  function changeQue() {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        player.answerQue = player.answerQue - 1;
        if (player.active) {
          player.answerQue = players.length;
          player.active = false;
        }
        if (player.answerQue <= 0) {
          player.active = true;
        }
        return player;
      });
    });
  }

  const shuffleAnswers = (correct, incorrect) => {
    let answers = correct.concat(incorrect);
    let shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    return shuffledAnswers;
  };

  return (
    <div>
      <h1>Game Table</h1>
      <Playerlist players={players} />
      <p>Question: {question}</p>
      <p>Answers: </p>
      <ul>
        {shuffledAnswers.map((answer, index) => (
          <ButtonGroup key={index} variant="contained" color="primary">
            <button
              disabled={disabledButtons.includes(index)}
              onClick={() => checkAnswer(answer, index)}
            >
              {answer}
            </button>
          </ButtonGroup>
        ))}
      </ul>
    </div>
  );
};

export default Gametable;
