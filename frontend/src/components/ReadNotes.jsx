
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ReadNotes = () => {

  const fetchData = useSelector((store) => store.fetchData);
  const [pdfData, setPdfData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPdfData(fetchData.pdfData);
  }, [fetchData]);

  if (!pdfData) {
    return <p>no pdf availabel...</p>
  }

  return (


    <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSheet" style={{height: "100vh"}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header border-bottom-0">
            <h1 className="modal-title fs-5">{pdfData.name} Handwritten Notes</h1>
          </div>
          <div className="modal-body py-0">
            <p>This is a modal sheet, a variation of the modal that docs itself to the bottom of the viewport like the newer share sheets in iOS.</p>
          </div>
          <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <a href={pdfData.link} className="btn btn-lg btn-primary" target="_blank" rel="noopener noreferrer">Open PDF</a>
            {/* <Link to="/" className="btn btn-lg btn-secondary" data-bs-dismiss="modal">Close</Link> */}
            <button className="btn btn-lg btn-secondary" onClick={() => navigate("/")}>Close</button>
          </div>
        </div>
      </div>
    </div>




  );
}
export default ReadNotes;