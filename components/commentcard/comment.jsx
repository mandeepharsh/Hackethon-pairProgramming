import "./comment.scss";

const Comment = ({ mess }) => {
  return (
    <div className="comment">
      <p className="comment__name">{mess.name}</p>
      <p className="comment__message">{mess.message}</p>
    </div>
  );
};

export default Comment;
