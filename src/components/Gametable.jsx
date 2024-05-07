import React, { useState, useEffect } from "react";
import Playerlist from "./Playerlist";
import questions from "../../content/questions";
import { ButtonGroup } from "@mui/material";

//pelipöytä
const Gametable = () => {

  //make player object for the current player



  const [players, setPlayers] = useState([]);
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
      } else {
        console.log("Wrong answer");
        player.roundScore = 0;
        player.answerQue = null;
      }
      setDisabledButtons([...disabledButtons, index]); // Disable the button
      changeQue();
    }
  }

  


  function changeQue() {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        const newPlayer = { ...player }; // Create a new player object to update
        newPlayer.answerQue = player.answerQue - 1;
        if (newPlayer.active) {
          newPlayer.answerQue = players.length;
          newPlayer.active = false;
        }
        if (newPlayer.answerQue === 1) {
          newPlayer.active = true;
        }
        return newPlayer;
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
