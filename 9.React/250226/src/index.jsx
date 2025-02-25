import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const render = () => {
    root.render(<App />);
};

// 최초 렌더링
render();

// ✅ HMR 활성화: 변경된 모듈(App.js)만 다시 로드
if (module.hot) {
    module.hot.accept("./App", () => {
      import("./App").then(({ default: NextApp }) => {
        root.render(<NextApp />);
      });
    });
  }