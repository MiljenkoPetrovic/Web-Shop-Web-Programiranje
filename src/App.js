import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Cart from './Pages/Cart';
import { Store } from './Pages/Store';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/SignIn" index element={<SignIn />} />
          <Route path="/SignUp" index element={<SignUp />} />
          <Route path="/Cart" index element={<Cart />} />
          <Route path="/Store" index element={<Store />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
