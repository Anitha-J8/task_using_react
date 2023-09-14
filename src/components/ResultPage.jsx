import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const ResultPage = () => {
  const location = useLocation();
  const {
    totalQuestions,
    answeredQuestions,
    totalMarks,
    passMarks,
    marksObtained,
    result,
  } = location.state;

  return (
    <section className="result">
      <div className="result-container">
        <h1>Exam Result</h1>
        <p>Total Questions: {totalQuestions}</p>
        <p>Questions Answered: {answeredQuestions}</p>
        <p>Total Marks: {totalMarks}</p>
        <p>Pass Marks: {passMarks}</p>
        <p>Marks Obtained: {marksObtained}</p>
        <p>Result: {result}</p>
        <Link to="/">
          <button className="btn btn-success">Back to Home</button>
        </Link>
      </div>
    </section>
  );
};

export default ResultPage;
