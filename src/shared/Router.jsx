import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './../pages/Home';
import Login from './../pages/Login';
import Signup from './../pages/Signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={Login} />
        <Route path="/signup" element={Signup} />
        <Route path="/profile" />
        <Route />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
