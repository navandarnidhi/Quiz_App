
import { useNavigate } from "react-router-dom";
import style from "./RegistrationPage.module.css"
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from "react";
import { API_URL } from "./config";
import { useDispatch } from "react-redux";
import { fetchDataAction } from "../store/fetchDataSlice";
const RegistrationPage = () => {

  const navigate = useNavigate();

  const userName = useRef();
  const otp = useRef();
  const email = useRef();

  const dispatch = useDispatch();

  const [isOtpSent,setIsOtpSent] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailVal = email.current.value;
    const otpVal = otp.current.value;
    const userNameVal = userName.current.value; // Access the ref value

    const response = await fetch(`${API_URL}/user/reg`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailVal,
        otp: otpVal,
        userName: userNameVal,
      })
    })

    if (response.ok) {
      const data = await response.json();
      dispatch(fetchDataAction.setToken(data.jwt))
      toast.success("Registration Successful...",{
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);

    }
    else {
      toast.error("Registration Failed. Please try again!",{
        autoClose: 3000,
      });
      console.error("registration failed....");
    }


  }



  const handleSendOtp = ()=>{
    setIsLoading(true);
    fetch(
      `${API_URL}/user/sent/login-signup-otp`,{
        method: "POST",
        headers:{
        "Content-Type": "application/json"
      },
        body: JSON.stringify({
          email: email.current.value
        })
      }
    )
    .then(response => {
      if(response.ok){
        setIsOtpSent(true);
      }
      else{
        console.log("Failed to send OTP")
      }
    }

    )
    .catch(error=>{
      console.error("Error sending OTP:", error);
    })
    .finally(()=>{
      setIsLoading(false);
    })
  }

  const [timer, setTimer] = useState(30);
  
    const [isTimerActive, setIsTimerActive] = useState(false);
  
    const handleResendOTP =()=>{
      fetch(
        `${API_URL}/user/sent/login-signup-otp`,{
          method: "POST",
          headers: {
        "Content-Type": "application/json"
      },
          body: JSON.stringify({
            email: email.current.value
          })
        }
      )
      setTimer(30);
      setIsTimerActive(true);
    }
  
    useEffect(()=>{
      let interval;
      if(isTimerActive){
        interval = setInterval(()=>{
        setTimer((prev)=>{
          if(prev==1){
            clearInterval(interval);
            setIsTimerActive(false);
            return 30;
          }
          return prev-1;
        })
      },1000)
      }
  
      return ()=>{
        if(interval) clearInterval(interval);
      };
    },[isTimerActive])

  return (
    <div className={style.signupFormWrapper}>
      <form className={style.signupForm} onSubmit={handleSubmit} >
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
            required
            ref={email}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        
        {isOtpSent && <div><div>
          <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="otp"
            required
            ref={otp}
          />
          <label htmlFor="floatingPassword">Enter Otp</label>
        </div>

        <p>
                      {isTimerActive ? (
                        <span>Resend OTP in {timer} seconds</span>
                      ) : (
                        <>
                          Didn’t receive OTP?{" "}
                          <span
                            onClick={handleResendOTP}
                            className={style.resendOtp}
                            
                          >
                            Resend OTP
                          </span>
                        </>
                      )}
                    </p>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Vivek Jha"
            required
            ref={userName}
          />
          <label htmlFor="floatingInput">User Name</label>
        </div>
        </div>}


        <div>
          {isOtpSent ? (
            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign up
            </button>
          ) : (
            <button disabled={isLoading} onClick={handleSendOtp} className="btn btn-primary w-100 py-2">
              {isLoading ? (
                <div class="spinner-border text-dark" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              )
              
              :(
                "Sent Otp"
              )}
            </button>
          )}
        </div>
      </form>
      {/* <ToastContainer position="top-center" style={{
          marginTop: '20px', // Space from top of the screen
        }} /> */}
    </div>
  );
};

export default RegistrationPage;
