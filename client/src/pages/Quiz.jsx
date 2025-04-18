// src/pages/Quiz.jsx
import React, { useState } from 'react';

export const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/quiz')
  //     .then(res => res.json())
  //     .then(data => console.log('QUIZ:', data))
  //     .catch(err => console.error('Fetch error:', err));
  // }, []);
  

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/quiz');
      const data = await res.json();
      console.log('QUIZ RESPONSE:', data);
      setQuiz(data.quiz || []); // ✅ fix here
    } catch (err) {
      console.error('Failed to fetch quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Quiz Time!</h1>
  
      {quiz.length === 0 ? (
        <button onClick={fetchQuiz} className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              &nbsp; Loading...
            </>
          ) : (
            "Let's Do a Quiz"
          )}
        </button>
      ) : (
        <div className="space-y-6">
          {quiz.map((q, index) => (
            <div key={index} className="card bg-base-200 p-4 shadow">
              <h2 className="text-lg font-semibold mb-2 m-auto">
                {index + 1}. {q.question}
              </h2>
              <div className="grid grid-cols-1 gap-2 w-70 m-auto">
                {q.choices.map((option, idx) => (
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
