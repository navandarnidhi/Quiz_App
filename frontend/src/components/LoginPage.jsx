import { Link, useNavigate } from "react-router-dom";
import style from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { fetchDataAction } from "../store/fetchDataSlice";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "./config";
const LoginPage = () => {
  const email = useRef();
  const otp = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOtpSent,setIsOtpSent] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  async function loginHandle(e) {
    e.preventDefault();

    const emailVal = email.current.value; // Access the ref value
    const otpVal = otp.current.value;

    const response = await fetch(
      `${API_URL}/user/login`,
      {
        method: "POST",
        headers: {
      "Content-Type": "application/json"
    },
        body: JSON.stringify({
          email:emailVal,
          otp:otpVal,
        })
      }
    );

    // const responseText = await response.text(); // Use text() since the backend returns a string
    // dispatch(fetchDataAction.setToken(responseText));

    if (response.ok) {
      const data = await response.json();
      dispatch(fetchDataAction.setToken(data.jwt))
      toast.success("Login Successful...", {
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Login Failed. Please check your credentials!", {
        autoClose: 3000,
      });
      console.error("login failed....");
    }
  }

  const handleSendOtp = ()=>{
    setIsLoading(true);
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
    <div className={style.loginFormWrapper}>
      <form className={style.loginForm} onSubmit={loginHandle}>
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            ref={email}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        {isOtpSent && (

          <div>

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
          
          
        )}

        <div>
          {isOtpSent ? (
            <button className="btn btn-primary w-100 py-2" type="submit">
              Log in
            </button>
          ) : (
            <button disabled={isLoading} onClick={handleSendOtp} className="btn btn-primary w-100 py-2">
              {isLoading ? (
                <div class="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : "Sent Otp"}
            </button>
          )}
        </div>

        {/* Signup Link */}
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      {/* <ToastContainer position="top-center" style={{
        marginTop: '20px', // Space from top of the screen
      }} /> */}
    </div>
  );
};

export default LoginPage;
