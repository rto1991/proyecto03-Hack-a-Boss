import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Auth from './components/Auth';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <main>
          <Header />
          <Routes >
            <Route path='/' element={<Auth />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </main>
      <Footer />
      </>
  );
}

export default App;
