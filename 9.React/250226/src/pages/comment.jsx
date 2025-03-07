import React, {useState} from "react";

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