import { FaTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import style from "./Footer.module.css";
const Footer = () => {
  return <div className={`container ${style.footerContainer}`}>
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
      </a>
      <span className={`mb-3 mb-md-0 text-body-secondary ${style.footerTxt}`}>© 2025 VIVEK JHA</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><BsLinkedin className={style.icons} /></svg></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><FaTwitter className={style.icons} /></svg></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><BsInstagram className={style.icons} /></svg></a></li>
    </ul>
  </footer>
</div>
}

export default Footer