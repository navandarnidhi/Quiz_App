import { Link } from "react-router-dom";
import { LiaCheckCircle } from "react-icons/lia";

const QuizResult = ({ correctAns, quesLength }) => {

  const percentage = (correctAns / quesLength) * 100;
  return (
    <div className="position-relative p-5 text-center text-muted bg-body rounded-5" style={{ marginTop: '115px' }}>
      <LiaCheckCircle style={{ fontSize: '80px' }} />
      <h1 className="text-body-emphasis">Quiz Completed!</h1>
      <p className="col-lg-6 mx-auto mb-4">
        Your Score: {correctAns} out of {quesLength}
      </p>
  
      {percentage >= 80 && <p>Excellent work! Keep it up!</p>}
      {percentage < 80 && percentage >= 50 && <p>Good job! You can do even better!</p>}
      {percentage < 50 && <p>Don't give up! Try again!</p>}
    
      <Link className="btn btn-primary" to="/" role="button">
        Go Back
      </Link>
    </div>
  );
}
export default QuizResult;