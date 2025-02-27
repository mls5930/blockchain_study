import { Header } from "./layout/Header"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact";

function App() {
  return (
    <BrowserRouter className="App">
      
      {/* Header 에 관련된 Routes */}
      <Routes>
        <Route path="*" element={<Header/>}/>
      </Routes>
      {/* Content 에 관련된 Routes */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* Footer 에 관련된 Routes */}
    </BrowserRouter>
  );
}

export default App;
