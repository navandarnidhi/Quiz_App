import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import style from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAction } from "../store/fetchDataSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import "bootstrap/dist/js/bootstrap.bundle.min";
const Navbar = () => {
  const fetchData = useSelector((store) => store.fetchData);
  const token = fetchData.token;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (token) {
      fetch(`${API_URL}/question/category/java`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });

      return () => {
        controller.abort();
      };
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const dispatch = useDispatch();
  const handleLogoutButton = () => {
    dispatch(fetchDataAction.setToken(""));
    toast.success("Logout Successful...", {
      autoClose: 2000,
    });
  };

  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary rounded ${style.navigationBar}`}
      aria-label="Twelfth navbar example"
    >
      <div className="container-fluid">
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> */}

        <div className="dropdown">
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-target="#navbarsExample10"
            aria-controls="navbarsExample10"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <ul className={`dropdown-menu ${style.dropdown}`}>
            <li className={`${style.listItem}`}>
              <a
                className="nav-link"
                aria-current="page"
                href="#Home"
              >
                Home
              </a>
            </li>
            <li className={`${style.listItem}`}>
              <a
                className="nav-link"
                aria-current="page"
                href="#Quiz"
              >
                Quiz
              </a>
            </li>
            <li className={`${style.listItem}`}>
              <a
                className="nav-link"
                aria-current="page"
                href="#Notes"
              >
                Notes
              </a>
            </li>
            <li className={`${style.listItem}`}>
              <a
                className="nav-link"
                aria-current="page"
                href="#Performers"
              >
                Top Performers
              </a>
            </li>
            
            <li className="nav-item">
              {/* Conditional rendering for logout/login buttons based on authentication */}
              {isAuthenticated ? (
                <button
                  type="button"
                  style={{all: "unset"}}
                  onClick={handleLogoutButton}
                >
                  Logout <IoMdLogOut />
                </button>
              ) : (
                <button
                  type="button"
                  style={{all: "unset"}}
                  onClick={handleLoginButton}
                >
                  Login <IoMdLogIn />
                </button>
              )}
            </li>
            
          </ul>
        </div>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={`nav-link ${style.navButton}`}
                aria-current="page"
                href="#Home"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${style.navButton}`} href="#Quiz">
                Quiz
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${style.navButton}`} href="#Notes">
                Notes
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${style.navButton}`} href="#Performers">
                Top Performers
              </a>
            </li>
            {/* <li className="nav-item">
            <button type="button" className={`btn ${style.navButton}`} onClick={handleLogoutButton}>Logout<IoMdLogOut /></button>
          </li> */}

            <li className="nav-item">
              {/* Conditional rendering for logout/login buttons based on authentication */}
              {isAuthenticated ? (
                <button
                  type="button"
                  className={`btn ${style.navButton}`}
                  onClick={handleLogoutButton}
                >
                  Logout <IoMdLogOut />
                </button>
              ) : (
                <button
                  type="button"
                  className={`btn ${style.navButton}`}
                  onClick={handleLoginButton}
                >
                  Login <IoMdLogIn />
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* <ToastContainer position="top-center" style={{
      zIndex: 500000, // Maximum z-index to ensure it's on top
      marginTop: '20px', // Space from top of the screen
    }} /> */}
    </nav>
  );
};

export default Navbar;
