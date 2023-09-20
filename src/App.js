import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth, db } from './firebaseConfig';
import React, { useEffect } from 'react';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { Store } from './Pages/Store';
import { ShoppingCartProvider } from './Components/Context/ShoppingCartContext';
import { AuthProvider } from './Components/Context/AuthContext';

function App() {
  // No need to initialize Firebase here; it's already initialized in firebaseConfig.js

  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <AuthProvider> 
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Store" element={<Store />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
