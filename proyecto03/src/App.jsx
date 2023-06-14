import { BrowserRouter as Router } from "react-router-dom";
import Init from "./components/Init/Init";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";

function App() {
  return (
    <Router>
      <header className="App">
        <LanguageSelector />
        <Init />
      </header>
    </Router>
  );
}

export default App;
