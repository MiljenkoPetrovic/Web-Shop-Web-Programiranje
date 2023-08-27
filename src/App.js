import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { Store } from './Pages/Store';
import { ShoppingCartProvider } from './Components/Context/ShoppingCartContext';



function App() {
  return (
    <ShoppingCartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/SignIn" index element={<SignIn />} />
          <Route path="/SignUp" index element={<SignUp />} />
          <Route path="/Store" index element={<Store />} />

        </Route>
      </Routes>
    </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
