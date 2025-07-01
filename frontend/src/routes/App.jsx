
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
      <Outlet />

      <ToastContainer position="top-center" style={{
        marginTop: '20px', // Space from top of the screen
      }} />
    </>
  )
}

export default App
