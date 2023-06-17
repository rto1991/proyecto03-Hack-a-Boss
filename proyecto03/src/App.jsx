import { BrowserRouter as Router } from "react-router-dom";
import Init from "./components/Init/Init";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";

function App() {
  return (
    <Router>
      <LanguageSelector />
      <Init />
    </Router>
  );
}

export default App;
