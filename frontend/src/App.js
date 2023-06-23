import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Auth from './components/Auth';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import NotFound from './pages/NotFound';
import Uservalidate from './pages/Uservalidate';
import { useState } from 'react';

function App() {

  // const [ id, setId ] = useState();
  // console.log(id);
  // esto me da undefined

  return (
    <>
      <main>
        <Header />
            <Routes >
              <Route path='/' element={<Auth />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path={`/loginuser`} element={<Uservalidate />} />
              <Route path='/user' element={<UserPage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
      </main>
      <Footer />
      </>
  );
}

export default App;
