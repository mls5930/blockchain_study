"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }


class App extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
      href: "#"
    }, "menu1")));
  }
}
const root = _reactDom.default.createRoot(document.querySelector("#root"));
root.render(/*#__PURE__*/_react.default.createElement(App, null));
