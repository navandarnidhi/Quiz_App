import React, { useEffect, useState } from 'react';
import { getAllQuizzes } from '../../services/quizService';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Safely parse user from localStorage
  const rawUser = localStorage.getItem("user");
  const user = rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading quizzes...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-xl font-semibold">{quiz.title}</h3>
            <p className="text-gray-600">{quiz.description}</p>

            {/* ✅ Show different actions based on role */}
            {user?.role === "ADMIN" ? (
              <div className="mt-2 space-x-2">
                <Link to={`/quiz/${quiz.id}/questions`} className="text-blue-600 hover:underline">Manage Questions</Link>
                <Link to={`/quiz/edit/${quiz.id}`} className="text-yellow-600 hover:underline">Edit</Link>
              </div>
            ) : (
              <div className="mt-2">
                <Link to={`/quiz/${quiz.id}`} className="text-green-600 hover:underline">Take Quiz</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
