import React, { useState } from "react";
const subjects = [
  {
    id: 1,
    name: "Mathematics",
    numberOfQuestions: 5,
    totalMarks: 5,
    passMark: 3,
    timeLimitMinutes: 2,
  },
  {
    id: 2,
    name: "Science",
    numberOfQuestions: 5,
    totalMarks: 5,
    passMark: 3,
    timeLimitMinutes: 2,
  },
];

const HomePage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const openPopup = (subject) => {
    setSelectedSubject(subject);
  };

  const closePopup = () => {
    setSelectedSubject(null);
  };

  const startExam = () => {
    closePopup();
    if (selectedSubject) {
      window.location.href = `/questions/${selectedSubject.id}`;
    }
  };

  return (
    <section className="home">
      <div className="home-container">
        <h1>Online Test</h1>
        <h2>Select a Subject to Start the Exam:</h2>
        <ul>
          {subjects.map((subject) => (
            <li key={subject.id}>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => openPopup(subject)}
              >
                {subject.name}
              </button>
            </li>
          ))}
        </ul>

        {selectedSubject && (
          <div
            className="modal mt-5"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedSubject ? selectedSubject.name : ""}
                  </h5>
                </div>
                <div className="modal-body">
                  {selectedSubject && (
                    <div>
                      <p>
                        Number of Questions: {selectedSubject.numberOfQuestions}
                      </p>
                      <p>Total Marks: {selectedSubject.totalMarks}</p>
                      <p>Pass Mark: {selectedSubject.passMark}</p>
                      <p>
                        Time Limit: {selectedSubject.timeLimitMinutes} minutes
                      </p>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={startExam}
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
