// 리액트 설치할거임 그리고 가져올거임
// const React = require("react");
// const ReactDOM = require("react-dom");
import React from "react"
import ReactDOM from "react-dom"

class App extends React.Component {
    render() {
        return (
            <ul>
                <li>
                    <a href="#">menu1</a>
                </li>
            </ul>
        )
    }
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />)