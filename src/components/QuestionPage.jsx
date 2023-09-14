import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QuestionPage = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const mathQuestions = [
    {
      question: "What is the result of 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      question: "Solve for x: 3x - 7 = 11",
      options: ["3", "4", "6", "6.33"],
      correctAnswer: "6",
    },
    {
      question: "What is the square root of 25?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "5",
    },
    {
      question: "If a = 5 and b = 3, what is a + b?",
      options: ["5", "8", "15", "20"],
      correctAnswer: "8",
    },
    {
      question: "What is the value of π (pi) correct to two decimal places?",
      options: ["3.14", "3.141", "3.142", "3.1416"],
      correctAnswer: "3.14",
    },
  ];

  const scienceQuestions = [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "NaCl"],
      correctAnswer: "H2O",
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Methane"],
      correctAnswer: "Carbon dioxide",
    },
    {
      question: "What is the Earth's largest organ?",
      options: ["Brain", "Heart", "Skin", "Lungs"],
      correctAnswer: "Skin",
    },
    {
      question: "What is the process by which plants make their own food?",
      options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
      correctAnswer: "Photosynthesis",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au",
    },
  ];

  const questions =
    subjectId === "1"
      ? mathQuestions
      : subjectId === "2"
      ? scienceQuestions
      : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(120);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill("")
  );

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(countdown);
          handleSubmit();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLastQuestion(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = questions.map((question) => question.correctAnswer);
    const marksObtained = userAnswers.reduce(
      (totalMarks, userAnswer, index) =>
        userAnswer === correctAnswers[index] ? totalMarks + 1 : totalMarks,
      0
    );
    navigate("/result", {
      state: {
        totalQuestions: questions.length,
        answeredQuestions: userAnswers.filter((answer) => answer !== "").length,
        totalMarks: questions.length,
        passMarks: Math.ceil((questions.length * 60) / 100),
        marksObtained,
        result:
          marksObtained >= Math.ceil((questions.length * 60) / 100)
            ? "Pass"
            : "Fail",
      },
    });
  };

  const currentQues = questions[currentQuestion];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = option;
    setUserAnswers(updatedUserAnswers);
  };

  return (
    <section className="questions">
      <div className="question-container">
        <h2>Question {currentQuestion + 1}</h2>
        {currentQues ? (
          <>
            <p>{currentQues.question}</p>
            <ul>
              {currentQues.options.map((option, index) => (
                <li key={index}>
                  <label className="option-label">
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionChange(option)}
                      className="option-input"
                    />
                    {option}
                    <span className="option-checkmark"></span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No question available for this subject.</p>
        )}
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="btn btn-warning mx-3"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={isLastQuestion}
          className="btn btn-primary mx-3"
        >
          Next
        </button>
        {isLastQuestion && (
          <button onClick={handleSubmit} className="btn btn-success mx-3">
            Submit
          </button>
        )}
        <p className="mt-5">Time Left: {timeLeft} seconds</p>
      </div>
    </section>
  );
};

export default QuestionPage;
