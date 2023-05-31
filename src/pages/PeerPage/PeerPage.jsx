import { useEffect, useState } from "react";
import "../PeerPage/PeerPage.scss";
import PeerSupport from "../../../components/peerSupport/peerSupport";
import Comment from "../../../components/commentcard/comment";
import axios from "axios";

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
    return <div>...loading</div>;
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
      <h2>Connect with your peers</h2>
      <div className="comments">
        {message.map((mess) => {
          return <Comment mess={mess} />;
        })}

        <form onSubmit={handleSumbit}>
          <label className="comment__form">
            Name :{" "}
            <input
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
              name="name"
            />
          </label>
          <label>
            Message :{" "}
            <textarea
              type="text"
              onChange={(event) => {
                setHelpMessage(event.target.value);
              }}
              value={helpMessage}
              name="message"
            />
          </label>
          <button>Sumbit</button>
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
