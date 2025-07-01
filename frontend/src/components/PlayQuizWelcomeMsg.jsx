import style from "./PlayQuizWelcomeMsg.module.css";
const PlayQuizWelcomeMsg = () => {
  return (
    <div className={style.optionsContainer}>
      <div className={style.question}>

        <h2>Java Quiz</h2>
        <div className={`col col-lg-2 ${style.noOfQDev}`}>
          Question 0 of 0
        </div>
        <p className={style.quesTxt}><strong>Sorry!</strong> &nbsp;&nbsp;We encountered an issue while fetching the data. Please try again . . . . . . . . . .</p>
      </div>

    </div>
  )
}
export default PlayQuizWelcomeMsg;