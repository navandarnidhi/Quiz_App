import { PiStudentDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (



    <div className="px-4 py-5 my-5 text-center" id="Home" >

      <PiStudentDuotone size={85} style={{marginBottom: "50px"}}/>


      <h1 className="display-5 fw-bold text-body-emphasis" >Welcome To Master Quiz</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">your ultimate learning companion! Test your knowledge and sharpen your skills with interactive quizzes across a wide range of subjects. Whether you're preparing for exams or just love learning, our platform offers engaging quizzes to challenge and educate you. Plus, access a curated collection of handwritten notes to reinforce your understanding. Dive in, explore, and master your subjects with ease!</p>
        
      </div>
    </div>




  )
}
export default HomePage;