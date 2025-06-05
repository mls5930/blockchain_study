import { Header } from "./components/header";
import { Counter } from "./pages/Counter"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, MainPage2, Page } from "./pages";
import { HerderPage } from "./layout/header";
import { store } from "./store";
import { Provider } from "react-redux";
import { StudyMainPage } from "./layout/mainpage";
import { Page2 } from "./pages/Page2";
import { Page3 } from "./pages/Page3";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HerderPage />}>
              <Route path="main1" element={<MainPage />}></Route>
              <Route path="main2" element={<MainPage2 />}></Route>
            </Route>
            <Route path="body" element={<StudyMainPage />}>
              <Route path="page1" element={<Page />}></Route>
              <Route path="page2" element={<Page2 />}></Route>
              <Route path="page3" element={<Page3 />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;