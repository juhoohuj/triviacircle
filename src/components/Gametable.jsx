import React, { useState } from "react";
import Playerlist from "./Playerlist";
import questions from "../../content/questions";

//pelipöytä
const Gametable = () => {
  const testUser = {
    id: 1,
    name: "Test User",
    score: 0,
    active: true,
    answerQue: 1,
  };

  const testUser2 = {
    id: 2,
    name: "Test User 2",
    score: 4,
    active: true,
    answerQue: 2,
  };

  const [players, setPlayers] = useState([testUser, testUser2]);
  const [question, setQuestion] = useState(questions[0].question);
  const [correct, setCorrect] = useState(questions[0].correct);
  const [incorrect, setIncorrect] = useState(questions[0].incorrect);

  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  function checkAnswer(answer) {
    let newPlayers = players.map((player) => {
      if (player.active) {
        if (correct.includes(answer)) {
          player.score = player.score + 1;
        }
        player.active = false;
      }
      return player;
    });
    setPlayers(newPlayers);
    changeQue();
  }

  const shuffleAnswers = (correct, incorrect) => {
    let answers = correct.concat(incorrect);
    let shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    return shuffledAnswers;
  };

  function changeQue() {
    let newPlayers = players.map((player) => {
      if (player.active) {
        player.answerQue = player.answerQue - 1;
      }
      if (player.answerQue === 0) {
        player.answerQue = players.length;
      }
      return player;
    });
    setPlayers(newPlayers);
  }

  return (
    <div>
      <h1>Game Table</h1>
      <Playerlist players={players} />
      <p>Question: {question}</p>
      <p>Answers: </p>
      <ul>
        {shuffleAnswers(correct, incorrect).map((answer, index) => (
          <button key={index} onClick={() => checkAnswer}>{answer}</button>
        ))}
      </ul>
    </div>
  );
};

export default Gametable;
