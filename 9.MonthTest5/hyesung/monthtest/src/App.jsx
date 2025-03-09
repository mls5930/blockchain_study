import './App.css';
import CounteProvider from './store/CountProvider'
import Counter from './pages/counter'
import Countertext from './pages/countText'
import Time from "./pages/Time"
function App() {
  return (
    <CounteProvider>
      <Countertext>
          <Counter/>
          <Time/>
      </Countertext>
    </CounteProvider>
  );
}

export default App;
