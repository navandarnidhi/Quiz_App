import { Link, useNavigate } from "react-router-dom";
import style from "./Quiz.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAction, fetchQuestion } from "../store/fetchDataSlice";
import { ToastContainer, toast } from 'react-toastify';

const Quiz = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = useSelector((store) => store.fetchData);

  async function fetchQues(category) {
    await alert(`Starting ${category.charAt(0).toUpperCase() + category.slice(1)} Quiz!`);
    await dispatch(fetchDataAction.setCategory(category));
    const fetchStatus = await fetchQuestion(category, fetchData.token, dispatch)
    return fetchStatus;
  }

  async function handleClick(category) {
    // Wait for the fetchQues to finish before navigating
    const fetchStatus = await fetchQues(category);
    if (fetchStatus) {
      // After fetchQues is done, navigate to /playQuiz
      navigate('/playQuiz');
    }
    else {
      toast.error("You need to log in to access this page...",{
        autoClose: 3000,
      })
    }
  };

  return (
    <main id="Quiz">

      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light quizHeading">Coding Quiz</h1>
            <p className="lead text-body-secondary">Explore a diverse collection of quizzes designed to test your knowledge across various subjects. Whether you're preparing for exams or just want to challenge yourself, our quizzes offer an engaging way to learn and improve.</p>
          </div>
        </div>
      </section>



      <div className={style.QuizWrapper}>

        <div className="card" style={{ width: "18rem" }}>
          <img src="image/java.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">Java</h5>
            <p className="card-text">Challenge yourself with these quick Java questions. Select the correct answer from the options below and see how well you know Java programming concepts.</p>
            <Link to="#" className="btn btn-primary" onClick={() => {
              handleClick("java");
            }}>Take Quiz</Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="image/python.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">Python</h5>
            <p className="card-text">Challenge yourself with these quick Python questions. Select the correct answer from the options below and see how well you know Java programming concepts.</p>
            <Link to="#" className="btn btn-primary" onClick={() => {
              handleClick("python");
            }}>Take Quiz</Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="image/spring.png" className={`card-img-top ${style.cardImg}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">SpringBoot</h5>
            <p className="card-text">Challenge yourself with these quick SpringBoot questions. Select the correct answer from the options below and see how well you know Java programming concepts.</p>
            <Link to="#" className="btn btn-primary" onClick={() => {
              handleClick("spring_boot");
            }}>Take Quiz</Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="image/react.png" className={`card-img-top ${style.cardImg}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">ReactJs</h5>
            <p className="card-text">Challenge yourself with these quick ReactJs questions. Select the correct answer from the options below and see how well you know Java programming concepts.</p>
            <Link to="#" className="btn btn-primary" onClick={() => {
              handleClick("react_js");
            }}>Take Quiz</Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="image/net.png" className={`card-img-top ${style.cardImg}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">.Net</h5>
            <p className="card-text">Challenge yourself with these quick .Net questions. Select the correct answer from the options below and see how well you know Java programming concepts.</p>
            <Link to="#" className="btn btn-primary" onClick={() => {
              handleClick(".net");
            }}>Take Quiz</Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="image/dev.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">DevOps</h5>
            <p className="card-text">Challenge yourself with these quick DevOps questions. Select the correct answer from the options below and see how well you know Java programming concepts.</p>
            <Link to="#" className="btn btn-primary" onClick={() => {
              handleClick("devops");
            }}>Take Quiz</Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="image/js.png" className={`card-img-top ${style.cardImg}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">JavaScript</h5>
            <p className="card-text">Challenge yourself with these quick JavaScript questions. Select the correct answer from the options below and see how well you know Java programming concepts.</p>
            <Link to="#" className="btn btn-primary" onClick={() => {
              handleClick("javascript");
            }}>Take Quiz</Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="image/system.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
          <div className="card-body">
            <h5 className="card-title">Operating System</h5>
            <p className="card-text">Challenge yourself with these quick Operation System questions. Select the correct answer from the options below and see how well you know Java programming concepts.</p>
            <Link to="#" className="btn btn-primary" onClick={() => {
              handleClick("operation_system");
            }}>Take Quiz</Link>
          </div>
        </div>

      </div>


      {/* <ToastContainer position="top-center" style={{
        zIndex: 500000, // Maximum z-index to ensure it's on top
        marginTop: '20px', // Space from top of the screen
      }} /> */}

    </main>
  );
}

export default Quiz 