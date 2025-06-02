import { Header } from "./components/header";
import { Counter } from "./pages/Counter"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { MainPage2 } from "./pages/MainPage2";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header path="/" />
          <Routes>
            <Route>
              <Route path="main1" element={<MainPage />}></Route>
              <Route path="main2" element={<MainPage2 />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
