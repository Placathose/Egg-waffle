// src/pages/Quiz.jsx
import React, { useState } from 'react';

export const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3000/quiz');
    const data = await res.json();
    setQuiz(data.questions || []);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Quiz Time!</h1>

      {quiz.length === 0 ? (
        <button onClick={fetchQuiz} className="btn btn-primary">
          Let's Do a Quiz
        </button>
      ) : loading ? (
        <p>Loading quiz...</p>
      ) : (
        <div className="space-y-6">
          {quiz.map((q, index) => (
            <div key={index} className="card bg-base-200 p-4 shadow">
              <h2 className="text-lg font-semibold mb-2">
                {index + 1}. {q.question}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((option, idx) => (
                  <button key={idx} className="btn btn-outline btn-sm">
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
