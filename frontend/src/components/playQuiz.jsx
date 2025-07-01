
import { useEffect, useState } from "react";
import style from "./PlayQuiz.module.css"
import { useSelector } from "react-redux"
import PlayQuizWelcomeMsg from "./PlayQuizWelcomeMsg";
import QuizResult from "./QuizResult";
const PlayQuiz = () => {

  const fetchData = useSelector((store) => store.fetchData);

  const [questions, setQuestions] = useState([]);
  const [currentQuesIdx, setCurrentQuesIdx] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (fetchData.questions.length > 0) {
      setQuestions(fetchData.questions); // Set questions from Redux store
    }
  }, [fetchData]);

  // Handle when an answer is selected
  const handleOptionSelect = (selected) => {
    setSelectedOption(selected);
  };


  // Handle next button click
  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const currentQuestion = questions[currentQuesIdx];
      if (selectedOption === currentQuestion.rightAns) {
        setCorrectAns(correctAns + 1); // Increment score if correct
      }
    }

    if (currentQuesIdx + 1 < questions.length) {
      setCurrentQuesIdx(currentQuesIdx + 1); // Move to next question
      setSelectedOption(null); // Reset selected option
    } else {
      setQuizCompleted(true); // End quiz if it's the last question
    }
  };


  // Display the quiz result
  if (quizCompleted) {
    return (
      <QuizResult correctAns={correctAns} quesLength={questions.length}></QuizResult>
    );
  }


  // Show the current question and options
  const currentQuestion = questions[currentQuesIdx];

  return (
    <>

      {questions.length === 0 && <PlayQuizWelcomeMsg />}


      {questions.length !== 0 && !quizCompleted && <div className={style.optionsContainer}>
        <div className={style.question}>

          <h2>{currentQuestion.category} Quiz</h2>
          <div className={`col col-lg-2 ${style.noOfQDev}`}>
            Question {currentQuesIdx + 1} of {questions.length}
          </div>
          <p className={style.quesTxt}>{currentQuestion.questionText}</p>
        </div>


        <ul className={`list-group ${style.options}`}>
          {['option1', 'option2', 'option3', 'option4'].map((optionKey) => (
            <li key={optionKey} className="list-group-item">
              <input
                className="form-check-input me-1"
                type="radio"
                name="listGroupRadio"
                value={currentQuestion[optionKey]}
                id={optionKey}
                checked={selectedOption === currentQuestion[optionKey]}
                onChange={() => handleOptionSelect(currentQuestion[optionKey])}
              />
              <label className="form-check-label" htmlFor={optionKey}>
                {currentQuestion[optionKey]}
              </label>
            </li>
          ))}
        </ul>

        {/* <button type="button" className="btn btn-success" >Next</button> */}

        <button type="button" className="btn btn-success" onClick={handleNextQuestion}>
          Next
        </button>

      </div>}
    </>
  )


}
export default PlayQuiz;