import './style.css'

const React = require("react");
const ReactDOM = require("react-dom");
const home = require("./pages/home");

console.log(React);
console.log(ReactDOM);
console.log(home.name);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(React.createElement('div', null, "hello World!"));