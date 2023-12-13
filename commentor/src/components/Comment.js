import { useState, useRef, useEffect } from "react";
import Action from "./Action";

const Comment = ({
  handleInsertNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
  };


  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />

            <Action
              className="reply comment"
              type="COMMENT"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <span
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;