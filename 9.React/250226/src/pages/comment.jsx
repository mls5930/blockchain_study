import React, {useState} from "react";

export const SangAhComment = () => {
  // const content = "내용"
  const [content, setContent] = useState("");
  const [list, setList] = useState([
    {
      id: 1,
      content: "내용",
      created_at: "2025-02-26"
    }
  ]);
  
  const handleInputChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = [
      {
          id: list.length + 1,
          content: content,
          created_at: "2025-02-26"
      },
      ...list
    ]
    setList(newList);
    setContent("");
  }

  const handleDelete = (id) => {}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={content} onChange={handleInputChange}/>
        <button type="submit">땅!</button>
      </form>
      {list.map((value, index) => (
        <ul key={index}>
          <li>{value.content}</li>
          <li>{value.created_at}</li>
          <button onClick={value.id}>삭제</button>
        </ul>
      ))}
    </div>
  );
}

export const HyesungComment = () => {
  const [content, setContent] = useState("");
  const [list ,setList] = useState([
    {
      userid:"rhgPtjd",
      constent:"나는 내용",
      date: "02/26"
    }
  ])

  const handleInputChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = [
      ...list,
      {
        userid:"rhgPtjd",
        constent: content,
        date: "02/26"
      }
    ]
    setList(newComment)
  }
  return (
    <>
      <div>댓글을 입력해주세요</div>
        {list.map((value, index) => (
            <ul key={index}>
              <li>{value.constent}</li>
              <li>{value.date}</li>
              <li>{value.userid}</li>
            </ul>
          )
        )}
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          placeholder="댓글 입력" 
          value={content}
          onChange={handleInputChange}
        >
        </input>
        <button type="submit">등록</button>
      </form>
    </>
  )
}

export const YoujungComment = () => {
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (e) => {
      setNewComment(e.target.value);
  };
  
  const handleSubmit = (e) => {
      e.preventDefault();
      setComment ([
        ...comment,
        {
            userid: "dmsdbwjd7797", 
            content: newComment, 
            date: "2025-02-26"
        }
      ]);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h4>댓글 쓰기<span> {comment.length}</span></h4>
          <input 
            type="text" 
            placeholder="댓글 입력" 
            value={newComment}
            onChange={handleInputChange}
          />
          <button type="submit">등록</button>
        </form>
        <ul>
          {comment.map((value,index) =>  (
            <div key={index}>
              <li>{value.userid}</li>
              <li>{value.content}</li>
              <li>{value.date}</li>
            </div>
          ))}
        </ul>
    </div>
  )  
}

export const teajungComment = () => {
    return (
        <div>태정님</div>
    )
}
