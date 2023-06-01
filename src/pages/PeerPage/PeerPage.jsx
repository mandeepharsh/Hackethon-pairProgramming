import { useEffect, useState } from "react";
import "../PeerPage/PeerPage.scss";
import PeerSupport from "../../../components/peerSupport/peerSupport";
import Comment from "../../../components/commentcard/comment";
import axios from "axios";
import Loading from "../../../components/Loader/Loader";

const PeerPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState([]);
  const [name, setName] = useState("");
  const [helpMessage, setHelpMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/peers").then((response) => {
      setStudents(response.data);
      setIsLoading(false);
    });
  }, []);
  const getComments = () => {
    axios
      .get("http://localhost:8080/message")
      .then((res) => setMessage(res.data), console.log(message));
  };

  useEffect(() => {
    getComments();
  }, []);

  if (!!isLoading) {
    return <Loading />;
  }

  const handleSumbit = (event) => {
    event.preventDefault();

    const comment = {
      name: name,
      message: helpMessage,
    };
    setHelpMessage("");
    setName("");
    axios
      .post("http://localhost:8080/message", comment)
      .then((res) => getComments());
  };

  return (
    <>
      <div className="comments">
        <h2 className="comment__title">Connect with your peers</h2>
        {message.map((mess) => {
          return <Comment mess={mess} />;
        })}

        <form onSubmit={handleSumbit}>
          <label className="comment__form">
            Name :{" "}
            <input
              className="comment__input"
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
              name="name"
            />
          </label>
          <label className="comment__form">
            Message :{" "}
            <input
              className="comment__input comment__input--textarea"
              type="text"
              onChange={(event) => {
                setHelpMessage(event.target.value);
              }}
              value={helpMessage}
              name="message"
            />
          </label>
          <button className="comment__button">Sumbit</button>
        </form>
      </div>

      <div className="student-gallery">
        {students.map((student) => {
          return <PeerSupport key={student.name} student={student} />;
        })}
      </div>
    </>
  );
};

export default PeerPage;
