import './App.css';
import { Count } from "./pages/index";
import { CountProvider } from './store/index'

function App() {
  return (
    <>
      <CountProvider>
        <Count />
      </CountProvider>
    </>
  );
}

export default App;
