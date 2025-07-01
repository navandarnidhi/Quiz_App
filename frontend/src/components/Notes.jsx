
import style from "./Notes.module.css";
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDataAction } from "../store/fetchDataSlice";
import { API_URL } from "./config";
const Notes = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = useSelector((store) => store.fetchData);

  async function handleNotesClick(name) {
    const response = await fetch(`${API_URL}/pdf/getPdf/${name}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${fetchData.token}`,
      },
    });

    if (!response.ok) {
      toast.error("You need to log in to access this page...",{
        autoClose: 3000,
      });
    }

    else {
      const pdfData = await response.json();
      if (pdfData && pdfData.link) {
        await dispatch(fetchDataAction.setPdfData(pdfData))
        navigate("/readNotes")
      }
      else {
        toast.error("Invalid PDF data received.",{
          autoClose: 3000,
        });
      }
    }
  }


  return (

    <main id="Notes">

      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light quizHeading">Subject Notes</h1>
            <p className="lead text-body-secondary">Access a wide range of notes across different subjects, crafted to help you grasp key concepts easily. Whether you're revising or learning new material, our comprehensive notes are designed to support your academic journey.</p>
          </div>
        </div>
      </section>



      <div className={style.notesWrapper}>

        <div className={`card ${style.notesCard}`} style={{ width: "18rem", height: "10rem" }}>
          <img src="image/java.jpg" className={`card-img-top ${style.cardImg}`} alt="..." onClick={() => handleNotesClick('java')} />
        </div>

        <div className={`card ${style.notesCard}`} style={{ width: "18rem", height: "10rem" }}>
          <img src="image/python.jpg" className={`card-img-top ${style.cardImg}`} alt="..." onClick={() => handleNotesClick('python')} />
        </div>

        <div className={`card ${style.notesCard}`} style={{ width: "18rem", height: "10rem" }}>
          <img src="image/spring.png" className={`card-img-top ${style.cardImg}`} alt="..." />
        </div>

        <div className={`card ${style.notesCard}`} style={{ width: "18rem", height: "10rem" }}>
          <img src="image/react.png" className={`card-img-top ${style.cardImg}`} alt="..." />
        </div>

        <div className={`card ${style.notesCard}`} style={{ width: "18rem", height: "10rem" }}>
          <img src="image/net.png" className={`card-img-top ${style.cardImg}`} alt="..." />
        </div>

        <div className={`card ${style.notesCard}`} style={{ width: "18rem", height: "10rem" }}>
          <img src="image/dev.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
        </div>

        <div className={`card ${style.notesCard}`} style={{ width: "18rem", height: "10rem" }}>
          <img src="image/js.png" className={`card-img-top ${style.cardImg}`} alt="..." />
        </div>

        <div className={`card ${style.notesCard}`} style={{ width: "18rem", height: "10rem" }}>
          <img src="image/system.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
        </div>

      </div>

      {/* <ToastContainer position="top-center" style={{
        zIndex: 500000, // Maximum z-index to ensure it's on top
        marginTop: '20px', // Space from top of the screen
      }} /> */}

    </main>);
}
export default Notes;