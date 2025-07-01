import Footer from "./Footer";
import Home from "./Home";
import HomePage from "./HomePage";
import Navbar from "./Navbar"
import Notes from "./Notes";
import Performers from "./Performers";
import Quiz from "./Quiz";
const ContentPage = () => {
  return <>
    <Navbar />
    <HomePage />
    <Home />
    <Quiz />
    <Notes />
    <Performers />
    <Footer />
  </>
}

export default ContentPage;