import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//Router 사용을 위해 필요
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

//이동할 페이지에 해당하는 소스들
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import NoPage from "./pages/NoPage.jsx";

////////////////////////////

function App2() {

  return (
    <>
    <h1>React Page Routing</h1>
    <hr/>
      {/* Router 기능을 위해 */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <br/><hr/>      
      
    </>
  ) //return

} //App2

export default App2
