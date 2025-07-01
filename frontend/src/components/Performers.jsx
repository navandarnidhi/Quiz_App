import style from "./Performers.module.css";
const Performers = () => {
  return <main id="Performers">

    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light quizHeading">Top Performers</h1>
          <p className="lead text-body-secondary">Discover the top performers in our quiz challenges! See who’s leading the way and get inspired by their achievements. Check out their scores and see how you measure up!</p>
        </div>
      </div>
    </section>


    <div className={style.perfWrapper}>

      <div className={`card ${style.perfCard}`} style={{width: "12rem" , height: "16rem"}}>
        <img src="image/m1.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
      </div>

      <div className={`card ${style.perfCard}`} style={{width: "12rem" , height: "16rem"}}>
        <img src="image/m2.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
      </div>

      <div className={`card ${style.perfCard}`} style={{width: "12rem" , height: "16rem"}}>
        <img src="image/m3.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
      </div>

      <div className={`card ${style.perfCard}`} style={{width: "12rem" , height: "16rem"}}>
        <img src="image/m4.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
      </div>

      <div className={`card ${style.perfCard}`} style={{width: "12rem" , height: "16rem"}}>
        <img src="image/m5.jpg" className={`card-img-top ${style.cardImg}`} alt="..." />
      </div>

    </div>

  </main>
}
export default Performers