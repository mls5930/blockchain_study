import { Header } from "./layouts/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Home, Contact, Login } from "./pages"
import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Header 에 관련된 Routes */}
        <Routes>
          <Route path="*" element={<Header/>}/>
        </Routes>
        {/* Content 에 관련된 Routes */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}
          />
        </Routes>
        {/* Footer 에 관련된 Routes */}
      </BrowserRouter>
    </div>
  );
}

export default App;
