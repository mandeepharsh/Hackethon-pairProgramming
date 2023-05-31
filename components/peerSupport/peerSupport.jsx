import "../peerSupport/peerSupport.scss";
import placeHolder from "../../src/assets/blacksquare-logo.jpg";
import { IoLogoLinkedin } from "react-icons/io5";

function PeerSupport({ student }) {
  return (
    <>
      <section className="student">
        <div className="student__card">
          <img className="student__img" src={placeHolder} alt="" />
          <h1 className="student__name">{student.name}</h1>
          <a href={student.linkedinUrl}>
            <IoLogoLinkedin className="student__icon" />
          </a>
        </div>
      </section>
    </>
  );
}

export default PeerSupport;
